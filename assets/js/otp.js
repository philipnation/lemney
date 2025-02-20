
/**
 * OTPInput
 * 
 * Custom OTP class
 * For headless UI functionality
 * 
 * @author FranklinEkemezie (https://github.com/FranklinEkemezie)
 */
class OTPInput {

    /** * @var {HTMLInputElement[]} */
    OTPBoxEls = [];


    /** * @param {HTMLInputElement} OTPInputStore */
    constructor (OTPInputStore) {
        this.OTPInputStore = OTPInputStore;
        this.OTPCompleteCallbacks = [];
    }

    /**
     * @param  {...HTMLInputElement} OTPBoxEls 
     * @returns {OTPInput}
     */
    addOTPBoxes(...OTPBoxEls) {

        OTPBoxEls.forEach(OTPBoxEl => {
            this.addOTPBoxEl(OTPBoxEl);
        });

        return this;
    }

    /**
     * @param {HTMLInputElement} boxEl 
     */
    addOTPBoxEl(boxEl) {
        
        boxEl.__OTP_DATA__ = {
            value: null
        }
        this.OTPBoxEls.push(boxEl);
    }

    init(onSubmitCallbacks) {

        this.registerOTPCompleteCallbacks(...onSubmitCallbacks);

        if (this.OTPBoxEls <= 0) {
            return;
        }

        // Add event listeners
        this.OTPBoxEls.forEach(boxEl => {

            // 
            boxEl.addEventListener('keydown', (event) => {

                event.preventDefault();

                if (this.isOTPComplete()) return;

                // Handle backspace key
                const BACKSPACE_KEY = 'Backspace';
                if (event.key === BACKSPACE_KEY) {

                    const prevOTPBox = this.getPrevOTPBox();

                    // Update the OTP Box El
                    this.setOTPBoxValue(prevOTPBox, null);
                    prevOTPBox.focus();
                    
                    return;
                }

                // Validate the OTP and add it
                const OTPDigit = parseInt(event.key);
                if (Number.isNaN(OTPDigit)) return;

                // Update the OTP Box El
                this.setOTPBoxValue(boxEl, OTPDigit);

                // Update the "actual" hidden input
                this.OTPInputStore.value = this.getOTP(false);

                // Get the next input to focus,
                // stop if no other to focus
                const nextOTPBox = this.getNextOTPBox(false);
                if (this.isOTPComplete()) {
                    this.fireOTPCompleteCallbacks(this.getOTP());

                    return;
                }

                // Focus the next input
                nextOTPBox.focus();
            });

            // 
            boxEl.addEventListener('focus', (event) => {
                // Focus the right box
                this.getNextOTPBox().focus();
            });
        });

        // Focus the next one
        this.getNextOTPBox().focus();
    }

    setOTPBoxValue(boxEl, value) {
        boxEl.value = value;                // set value to be shown
        boxEl.__OTP_DATA__.value = value;   // set internal value
    }

    getOTPBoxValue(boxEl) {
        return boxEl.__OTP_DATA__?.value;
    }

    isOTPComplete() {
        return this.OTPBoxEls.every(boxEl => this.getOTPBoxValue(boxEl) !== null);
    }

    getPrevOTPBox(returnFirstIfNoPrev=true) {
        if (! this.OTPBoxEls.length) return null;

        return this.OTPBoxEls.reduce((resInfo, boxEl) => {
            if (this.getOTPBoxValue(boxEl) === null) {
                return resInfo;
            }

            return {el: boxEl};
        }, {el: returnFirstIfNoPrev ? this.OTPBoxEls[0] : null}).el;
    }

    getNextOTPBox(returnLastIfNoNext=true) {

        if (! this.OTPBoxEls.length) return null;

        const nextOTPBox = this.OTPBoxEls.find(boxEl => this.getOTPBoxValue(boxEl) === null);

        if (nextOTPBox) return nextOTPBox;
        if (! nextOTPBox && ! returnLastIfNoNext) return null;
        
        return this.OTPBoxEls.reverse()[0];
    }

    /**
     * 
     * @param {boolean} complain Complain if the OTP is not complete
     */
    getOTP(complain=true) {
        if (! this.isOTPComplete() && complain) {
            throw new Error("Cannot get incomplete OTP");
        }

        return this.OTPBoxEls.map(boxEl => this.getOTPBoxValue(boxEl)).join('');
    }

    registerOTPCompleteCallbacks(...callbacks) {
        this.OTPCompleteCallbacks.push(...callbacks);
        return this;
    }

    fireOTPCompleteCallbacks(otpNumber) {

        this.OTPCompleteCallbacks.forEach(OTPCallback => {

            //  
            OTPCallback(otpNumber);
        });

    }
}
