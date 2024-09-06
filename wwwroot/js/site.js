let validateInputsAndDisplayNextTab = (inputs, button, currentSection, currentSecNumber, followingSec, followingSecNumber) => {
    $(button).click(function(){
        let isValid = $(inputs).find("input").valid();

        if(isValid) {
            let sectionToHide = document.querySelector(currentSection);
            let stepNumberToHide = document.querySelector(currentSecNumber);

            let sectionToDisplay = document.querySelector(followingSec);
            let stepNumberToDisplay = document.querySelector(followingSecNumber);

            sectionToHide.classList.add("hidden");
            stepNumberToHide.classList.remove('step-number');

            sectionToDisplay.classList.remove('hidden');
            stepNumberToDisplay.classList.add('step-number');
        }
    });
}
$(document).ready(function(){
    // Initialize the form validation
    $("form").validate();
    validateInputsAndDisplayNextTab(".personal-info", "#validate-personal-info", ".personal-info", ".step-number-1", ".select-plan", ".step-number-2")
    // target the personal-info button
    // $("#validate-personal-info").click(function(){
    //     let isValid = $(".personal-info").find("input").valid();

    //     if(isValid) {
    //         let personalInfoSection = document.querySelector(".personal-info");
    //         let personalInfoStepNumber = document.querySelector(".step-number-1");

    //         let selectPlanSection = document.querySelector(".select-plan");
    //         let selectPlanStepNumber = document.querySelector(".step-number-2");

    //         personalInfoSection.classList.add("hidden");
    //         personalInfoStepNumber.classList.remove('step-number');

    //         selectPlanSection.classList.remove('hidden');
    //         selectPlanStepNumber.classList.add('step-number');

    //     } else {
    //         console.log('Form is invalid');
    //     }
    // });
});