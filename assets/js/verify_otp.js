
const otpActual = document.getElementById("otp-actual");
const OTPBoxEls = document.querySelectorAll(".otp-input-boxes input");

const otpInput = (new OTPInput(otpActual)).addOTPBoxes(...OTPBoxEls);
otpInput.init([(otpNumber) => {

    // Submit the form
    // const form = document.getElementById("verify-otp-form");
    // form.submit();

    console.log(`Submitting OTP: ${otpNumber}`);
}]);
