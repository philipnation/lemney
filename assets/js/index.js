/** ----------------------------------------
 * HERO AREA SWIPER
 ------------------------------------------ */
var swiperThumbnail = new Swiper(".swiperThumbnail", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
});

var swiperMain = new Swiper(".swiperMain", {
    loop: true,
    spaceBetween: 10,
});

/** --------------------------------------------
 * CUSTOMER REVIEW SWIPER
 ------------------------------------------------ */
const customerReviewSwiper = new Swiper(".customerReviewSwiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

/** --------------------------------------------
 * STAR REVIEW FUNCTIONALITY
 ------------------------------------------------ */
 function getPreviousSiblings(element) {
    let siblings = [];
    while (element.previousElementSibling) {
        element = element.previousElementSibling;
        siblings.push(element);
    }

    return siblings;
}

function addHighlightInStar(element) {
    element.classList.add("active");
}

function removeHighlightInStar(element) {
    element.classList.remove("active");
}

const reviewStarsBtns = document.querySelectorAll(".rating .btn-lemney-review-star");
const reviewStarsInput = document.querySelector(".review-stars-input");

let reviewRating = 0;
reviewStarsBtns.forEach((btn, index) => {

    let prevSiblings = getPreviousSiblings(btn);

    btn.addEventListener('mouseenter', () => {
        [...prevSiblings, btn].forEach(el => {
            addHighlightInStar(el);
        });
    });

    btn.addEventListener('mouseleave', () => {

        // remove all highlight
        reviewStarsBtns.forEach(el => {
            removeHighlightInStar(el);
        });
        
        for (let i = 0; i < reviewRating; i++) {
            addHighlightInStar(reviewStarsBtns[i]);
        }
    });

    btn.addEventListener('click', () => {

        reviewRating = index + 1;

        // remove all highlight
        reviewStarsBtns.forEach(el => {
            removeHighlightInStar(el);
        });
        
        for (let i = 0; i < reviewRating; i++) {
            addHighlightInStar(reviewStarsBtns[i]);
        }

        reviewStarsInput.value = reviewRating;
    });
});