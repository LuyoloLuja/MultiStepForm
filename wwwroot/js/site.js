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
    validateInputsAndDisplayNextTab(".personal-info", "#validate-personal-info", ".personal-info", ".step-number-1", ".select-plan", ".step-number-2");

    // Initially check if the checkbox is checked and update labels
    updateLabels($('#billing-cycle').is(':checked'));

    // Listen for changes on the checkbox
    $('#billing-cycle').change(function() {
        updateLabels($(this).is(':checked'));
    });
    
    function updateLabels(isYearly) {
        if (isYearly) {
            $('#yearly-label').addClass('active');
            $('#monthly-label').removeClass('active');
        } else {
            $('#monthly-label').addClass('active');
            $('#yearly-label').removeClass('active');
        }
    }
});