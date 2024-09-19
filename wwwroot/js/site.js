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

        let isYearly = $(this).is(':checked');

    });

    backButton("#btn-back-bill-type", ".select-plan", ".personal-info");
    
    function updateLabels(isYearly) {
        if (isYearly) {
            $('#yearly-label').addClass('active');
            $('#monthly-label').removeClass('active');

            $('.monthly-bill').addClass('hidden');
            $('.two-months-free').removeClass('hidden');
            $('.free-yearly').css('display', 'block');
        } else {
            $('#monthly-label').addClass('active');
            $('#yearly-label').removeClass('active');

            $('.monthly-bill').removeClass('hidden');
            $('.two-months-free').addClass('hidden');
            $('.free-yearly').css('display', 'none');
        }
    }

    function backButton(button, currentSection, prevSection) {
        document.querySelector(button).addEventListener('click', () => {
            document.querySelector(currentSection).classList.add('hidden');
            document.querySelector(prevSection).classList.remove('hidden')
        })
    }
});