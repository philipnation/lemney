(function () {

    // Select HTML elements
    const cartItemContainerEls = document.querySelectorAll(".cart-item");
    const cartItemSubtotalDisplay = document.querySelector(".subtotal-amount-display");
    const checkAllItemsCheckbox = document.querySelector("#check-all");
    const checkOutCartItemsSubmitBtn = document.querySelector("#checkout-submit-btn");

    const CART_ITEMS = [];

    const getCartItemObj = (checkbox, input, label, selected=false) => ({
        checkbox, input, label, selected
    });

    // Update total amount
    updateUI();

    checkAllItemsCheckbox.addEventListener("change", (e) => {

        if (e.target.checked) {
            // Check all the cart item checkboxes incase
            // they are not checked already
            CART_ITEMS.forEach(({ checkbox, }, index) => {
                checkbox.checked = true;
                CART_ITEMS[index].selected = true;
            });

        } else {

            // Uncheck all
            CART_ITEMS.forEach(({ checkbox }, index) => {
                checkbox.checked = false;
                CART_ITEMS[index].selected = false;

            });

        }

        // Update total amount
        updateUI();
    });


    // Populate the cart items
    cartItemContainerEls.forEach((el, index) => {

        const checkbox = el.querySelector(".select-cart-item");
        const input = el.querySelector(".cart-item-amount");
        const label = el.querySelector(".cart-item-label");

        // Add event listener to checkbox
        checkbox.addEventListener("change", (e) => {

            // Mark the item as selected
            CART_ITEMS[index].selected = e.target.checked;

            // Check if all items are marked as selected; mark the "All" checkbox
            // as selected
            if(CART_ITEMS.every(({ selected }) => selected)) {
                checkAllItemsCheckbox.click();
                return;
            }

            // Not all cart items are checked, so uncheck the "Check All" checkbox
            checkAllItemsCheckbox.checked = false;

            // update total amount
            updateUI()
            
        });

        CART_ITEMS.push(getCartItemObj(checkbox, input, label));
    });


    function updateTotalAmount() {
        const subtotal = calculateSubtotal();
        cartItemSubtotalDisplay.innerHTML = formatAmount(subtotal);

        return subtotal;
    }

    function formatAmount(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function updateUI() {
        // Update total amount
        const subtotal = updateTotalAmount();

        // Update CheckBox Submit button
        checkOutCartItemsSubmitBtn.disabled = subtotal <= 0;
    }

    function calculateSubtotal() {
        return CART_ITEMS.reduce((prev, curr) => {

            const { selected, input } = curr;

            if (! selected) return prev;

            return +(input.value) + prev;
        }, 0);
    }

    console.log(CART_ITEMS);
})();