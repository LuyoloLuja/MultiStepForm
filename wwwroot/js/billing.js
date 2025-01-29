import { getDOMElements } from "./billingDom.js";

document.addEventListener("DOMContentLoaded", function () {
    const dom = getDOMElements();

    let planDuration = "mo";
    let selectedPlanValue = 0;
    let chosenPlanFinishTotal = 0;

    function updatePlanLabels() {
        dom.yearlyLabel.classList.toggle("active", dom.planCheckboxElement.checked);
        dom.monthlyLabel.classList.toggle("active", !dom.planCheckboxElement.checked);
    }

    function updateBillingValues(isYearly) {
        planDuration = isYearly ? "yr" : "mo";

        dom.arcadePlanRadioBtnValue.value = isYearly ? 90 : 9;
        dom.advancedPlanRadioBtnValue.value = isYearly ? 120 : 12;
        dom.proPlanRadioBtnValue.value = isYearly ? 150 : 15;

        dom.addOnsOnlineServiceElement.innerHTML = `+$${isYearly ? 10 : 1}/${planDuration}`;
        dom.addOnsLargerStorageElement.innerHTML = `+$${isYearly ? 20 : 2}/${planDuration}`;
        dom.addOnsCustomizableStorageElement.innerHTML = `+$${isYearly ? 20 : 2}/${planDuration}`;
    }

    function displaySelectedAddOn(isSelected, name, amount) {
        const existingItem = dom.chosenAddOnsContainer.querySelector(`[data-name='${name}']`);
        if (isSelected) {
            if (!existingItem) {
                const div = document.createElement("div");
                div.setAttribute("data-name", name);
                div.innerHTML = `<span>${name}</span><span>+$${amount}/${planDuration}</span>`;
                dom.chosenAddOnsContainer.appendChild(div);
            }
        } else if (existingItem) {
            existingItem.remove();
        }
    }

    dom.addOnsOnlineServiceCheckboxElement.addEventListener("change", () => {
        displaySelectedAddOn(
            dom.addOnsOnlineServiceCheckboxElement.checked,
            "Online Service",
            dom.addOnsOnlineServiceCheckboxElement.checked ? (planDuration === "yr" ? 10 : 1) : 0
        );
    });

    dom.addOnsLargerStorageCheckboxElement.addEventListener("change", () => {
        displaySelectedAddOn(
            dom.addOnsLargerStorageCheckboxElement.checked,
            "Larger Storage",
            dom.addOnsLargerStorageCheckboxElement.checked ? (planDuration === "yr" ? 20 : 2) : 0
        );
    });

    dom.addOnsCustomizableCheckboxElement.addEventListener("change", () => {
        displaySelectedAddOn(
            dom.addOnsCustomizableCheckboxElement.checked,
            "Customizable Storage",
            dom.addOnsCustomizableCheckboxElement.checked ? (planDuration === "yr" ? 20 : 2) : 0
        );
    });

    dom.planCheckboxElement.addEventListener("change", function () {
        updateBillingValues(this.checked);
        updatePlanLabels();
    });

    updateBillingValues(false);
    updatePlanLabels();
});
