export const getDOMElements = () => {
    return {
        planCheckboxElement: document.querySelector("#billing-cycle"),
        monthlyLabel: document.querySelector("#monthly-label"),
        yearlyLabel: document.querySelector("#yearly-label"),
        planError: document.querySelector(".plan-text-danger"),
        arcadePlanRadioBtnValue: document.querySelector("#arcade-radio"),
        advancedPlanRadioBtnValue: document.querySelector("#advanced-radio"),
        proPlanRadioBtnValue: document.querySelector("#pro-radio"),
        onlineServiceLabel: document.querySelector(".online-service-label"),
        largerStorageLabel: document.querySelector(".larger-storage-label"),
        customizableStorageLabel: document.querySelector(".customizable-storage-label"),
        addOnsOnlineServiceCheckboxElement: document.querySelector("#online-service-checkbox"),
        addOnsLargerStorageCheckboxElement: document.querySelector("#large-storage-checkbox"),
        addOnsCustomizableCheckboxElement: document.querySelector("#customizable-storage-checkbox"),
        chosenPlanFinishElement: document.querySelector(".chosen-plan-finish-total"),
        addOnsOnlineServiceElement: document.querySelector(".add-ons-online-service"),
        addOnsLargerStorageElement: document.querySelector(".add-ons-larger-storage"),
        addOnsCustomizableStorageElement: document.querySelector(".add-ons-customizable-storage"),
        chosenAddOnsContainer: document.querySelector(".chosen-add-ons"),
    };
};