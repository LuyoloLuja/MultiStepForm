$(document).ready(function() {
    let arcadeValue = 0;
    let advancedValue = 0;
    let proValue = 0;

    let selectedPlanValue = 0;

    let updateCycleBills = (isYearly, arcade, advanced, pro) => {
        const arcadeElement = document.querySelector(arcade);
        const advancedElement = document.querySelector(advanced);
        const proElement = document.querySelector(pro);

        const yearlyTwoMonthFree = document.querySelectorAll(".two-months-free");
        const billElement = document.querySelectorAll(".monthly-bill");

        if(isYearly) {
            arcadeValue = 90;
            advancedValue = 120;
            proValue = 150;

            for(let i = 0; i < yearlyTwoMonthFree.length; i++) {
                yearlyTwoMonthFree[i].classList.remove("hidden");
                billElement[i].style.display = "block";
                billElement[i].style.padding = "0";
            }
            arcadeElement.innerHTML = `$${arcadeValue}/yr`;
            advancedElement.innerHTML = `$${advancedValue}/yr`;
            proElement.innerHTML = `$${proValue}/yr`;
        } else {
            arcadeValue = 9;
            advancedValue = 12;
            proValue = 15;

            for(let i = 0; i < yearlyTwoMonthFree.length; i++) {
                yearlyTwoMonthFree[i].classList.add("hidden");
            }
            arcadeElement.innerHTML = `$${arcadeValue}/mo`;
            advancedElement.innerHTML = `$${advancedValue}/mo`;
            proElement.innerHTML = `$${proValue}/mo`;
        }
    }

    const validateInputsAndDisplayNextTab = (inputs, button, currentSection, currentSecNumber, followingSec, followingSecNumber) => {
        $(button).click(function(){
            let isValid = $(inputs).find("input").valid();

            if(isValid) {
                if(currentSection === ".select-plan") {
                    selectedPlanValue = document.querySelector('input[name="BillingType.BillType"]:checked').value;
                    console.log(selectedPlanValue);
                }

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

    const backButton = (button, currentSection, prevSection) => {
        document.querySelector(button).addEventListener('click', () => {
            document.querySelector(currentSection).classList.add('hidden');
            document.querySelector(prevSection).classList.remove('hidden')
        })
    }

    // TO DO - check why my labels are not changing on click
    const checkboxBgOnChange = (checkbox, label) => {
        let checkboxElement = document.getElementById(checkbox);
        let labelElement = document.querySelector(label);

        checkboxElement.addEventListener('change', (event) => {
            let isChecked = event.target.checked;

            console.log(isChecked);
            if(isChecked) {
                labelElement.classList.add('custom-label');
            } else {
                labelElement.classList.remove('custom-label');
            }
            console.log(labelElement);
        });

        // Handle clicks on the label itself to simulate a change
        labelElement.addEventListener('click', (event) => {
            checkboxElement.checked = !checkboxElement.checked;  // Toggle checkbox state manually
            checkboxElement.dispatchEvent(new Event('change'));  // Trigger the 'change' event
        });
    }

    $("form").validate();

    validateInputsAndDisplayNextTab(".personal-info", "#validate-personal-info", ".personal-info", ".step-number-1", ".select-plan", ".step-number-2");
    validateInputsAndDisplayNextTab(".select-plan", "#validate-billing-type", ".select-plan", ".step-number-2", ".add-ons", ".step-number-3");
    validateInputsAndDisplayNextTab(".add-ons", "#validate-add-ons", ".add-ons", ".step-number-3", ".finishing-up", ".step-number-4");

    updateCycleBills(false, ".arcade-plan-bill", ".advanced-plan-bill", ".pro-plan-bill");

    $('#billing-cycle').change(function() {
        updateCycleBills($(this).is(':checked'), ".arcade-plan-bill", ".advanced-plan-bill", ".pro-plan-bill");
    });

    backButton("#btn-back-bill-type", ".select-plan", ".personal-info");
    backButton("#btn-back-add-ons", ".add-ons", ".select-plan");
});