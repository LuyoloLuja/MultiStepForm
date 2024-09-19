$(document).ready(function(){
    // Initialize the form validation
    $("form").validate();
    validateInputsAndDisplayNextTab(".personal-info", "#validate-personal-info", ".personal-info", ".step-number-1", ".select-plan", ".step-number-2");
    validateInputsAndDisplayNextTab(".select-plan", "#validate-billing-type", ".select-plan", ".step-number-2", ".add-ons", ".step-number-3");

    // Initially check if the checkbox is checked and update labels
    updateLabels($('#billing-cycle').is(':checked'));

    // Listen for changes on the checkbox
    $('#billing-cycle').change(function() {
        updateLabels($(this).is(':checked'));

        let isYearly = $(this).is(':checked');

    });

    checkboxBgOnChange("online-service-checkbox", ".online-service-label");

    backButton("#btn-back-bill-type", ".select-plan", ".personal-info");
    backButton("#btn-back-add-ons", ".add-ons", ".select-plan");
    
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
});

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

let backButton = (button, currentSection, prevSection) => {
    document.querySelector(button).addEventListener('click', () => {
        document.querySelector(currentSection).classList.add('hidden');
        document.querySelector(prevSection).classList.remove('hidden')
    })
}

const checkboxBgOnChange = (checkbox, label) => {
    let checkboxElement = document.getElementById(checkbox);

    checkboxElement.addEventListener('change', (event) => {
        let labelElement = document.querySelector(label);
        let isChecked = event.target.checked;

        console.log(isChecked);
        console.log(labelElement);
        if(isChecked) {
            labelElement.classList.add('custom-label');
        } else {
            labelElement.classList.remove('custom-label');
        }
    })
}

// document.getElementById('online-service-checkbox').addEventListener('change', function() {
//     console.log(this.checked); // Logs true when checked, false when unchecked
// });