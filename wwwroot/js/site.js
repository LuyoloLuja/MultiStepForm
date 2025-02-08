$(document).ready(function () {
	const planCheckboxElement = document.querySelector("#billing-cycle");
	const monthlyLabel = document.querySelector("#monthly-label");
	const yearlyLabel = document.querySelector("#yearly-label");

	let planError = document.querySelector(".plan-text-danger");

	let arcadePlanRadioBtnValue = document.querySelector("#arcade-radio");
	let advancedPlanRadioBtnValue = document.querySelector("#advanced-radio");
	let proPlanRadioBtnValue = document.querySelector("#pro-radio");

	let onlineServiceLabel = document.querySelector(".online-service-label");
    let largerStorageLabel = document.querySelector(".larger-storage-label");
    let customizableStorageLabel = document.querySelector(".customizable-storage-label");

	let addOnsOnlineServiceCheckboxElement = document.querySelector("#online-service-checkbox");
	let addOnsLargerStorageCheckboxElement = document.querySelector("#large-storage-checkbox");
	let addOnsCustomizableCheckboxElement = document.querySelector("#customizable-storage-checkbox");

	let addOnElementsArray = [
		addOnsOnlineServiceCheckboxElement,
		addOnsLargerStorageCheckboxElement,
		addOnsCustomizableCheckboxElement
	];

	let planDuration = "";

	let chosenPlanFinishTotal = 0;

	let selectedPlanValue = 0;

	let arcadeValue = 0;
	let advancedValue = 0;
	let proValue = 0;

	let addOnsOnlineServiceDisplayValue = 1;
	let addOnsLargerStorageDisplayValue = 2;
	let addOnsCustomizableStorageDisplayValue = 2;

	let addOnsOnlineServiceActualValue = 0;
	let addOnsCustomizableStorageActualValue = 0;
	let addOnsLargerStorageActualValue = 0;
	

	function updatePlanLabels() {
		if (planCheckboxElement.checked) {
			yearlyLabel.classList.add("active");
			monthlyLabel.classList.remove("active");
		} else {
			monthlyLabel.classList.add("active");
			yearlyLabel.classList.remove("active");
		}
	}

	let updateAddOnsBills = (isYearly) => {
		const onlineServiceElement = document.querySelector(".add-ons-online-service");
		const largerStorageElement = document.querySelector(".add-ons-larger-storage");
		const customizableStorageElement = document.querySelector(".add-ons-customizable-storage");

		if (isYearly) {
			planDuration = "yr";

			arcadePlanRadioBtnValue.value = 90;
			advancedPlanRadioBtnValue.value = 120;
			proPlanRadioBtnValue.value = 150;

			addOnsOnlineServiceDisplayValue = 10;
			addOnsLargerStorageDisplayValue = 20;
			addOnsCustomizableStorageDisplayValue = 20;

		} else {
			planDuration = "mo";

			arcadePlanRadioBtnValue.value = 9;
			advancedPlanRadioBtnValue.value = 12;
			proPlanRadioBtnValue.value = 15;

			addOnsOnlineServiceDisplayValue = 1;
			addOnsLargerStorageDisplayValue = 2;
			addOnsCustomizableStorageDisplayValue = 2;
		}
		onlineServiceElement.innerHTML = `+$${addOnsOnlineServiceDisplayValue}/${planDuration}`;
		largerStorageElement.innerHTML = `+$${addOnsLargerStorageDisplayValue}/${planDuration}`;
		customizableStorageElement.innerHTML = `+$${addOnsCustomizableStorageDisplayValue}/${planDuration}`;
	};

	let updateCycleBills = (isYearly, arcade, advanced, pro) => {
		const arcadeElement = document.querySelector(arcade);
		const advancedElement = document.querySelector(advanced);
		const proElement = document.querySelector(pro);

		const yearlyTwoMonthFree = document.querySelectorAll(".two-months-free");
		const billElement = document.querySelectorAll(".monthly-bill");

		if (isYearly) {
			planDuration = "yr";

			arcadeValue = 90;
			advancedValue = 120;
			proValue = 150;

			for (let i = 0; i < yearlyTwoMonthFree.length; i++) {
				yearlyTwoMonthFree[i].classList.remove("hidden");
				billElement[i].style.display = "block";
				billElement[i].style.padding = "0";
			}
		} else {
			planDuration = "mo";

			arcadeValue = 9;
			advancedValue = 12;
			proValue = 15;

			for (let i = 0; i < yearlyTwoMonthFree.length; i++) {
				yearlyTwoMonthFree[i].classList.add("hidden");
			}
		}
		arcadeElement.innerHTML = `$${arcadeValue}/${planDuration}`;
		advancedElement.innerHTML = `$${advancedValue}/${planDuration}`;
		proElement.innerHTML = `$${proValue}/${planDuration}`;
		updateAddOnsBills(isYearly);
	};

	const validateInputsAndDisplayNextTab = (inputs, button, currentSection, currentSecNumber, followingSec, followingSecNumber) => {
		$(button).click(function () {
			let isValid = $(inputs).find("input").valid();

			if (currentSection == ".select-plan") {
				let selectedPlanElement = document.querySelector('input[name="BillingType.BillType"]:checked');

				if (selectedPlanElement != null) {
					selectedPlanValue = selectedPlanElement.value;
				} else if (selectedPlanValue == 0) {
					isValid = false;
					planError.classList.remove("hidden");
				} else if (selectedPlanValue > 0) {
					planError.classList.add("hidden");
				}
			}

			if (currentSection == ".add-ons") {
				addOnsAddition();
			}

			if (isValid) {
				let sectionToHide = document.querySelector(currentSection);
				let stepNumberToHide = document.querySelector(currentSecNumber);

				let sectionToDisplay = document.querySelector(followingSec);
				let stepNumberToDisplay = document.querySelector(followingSecNumber);

				sectionToHide.classList.add("animate__animated", "animate__backOutLeft");
				sectionToHide.classList.add("hidden");
				stepNumberToHide.classList.remove("step-number");

				sectionToDisplay.classList.add("animate__animated", "animate__backInRight");
				sectionToDisplay.classList.remove("hidden");
				stepNumberToDisplay.classList.add("step-number");
			}
		});
	};

	const getSelectedAddOnValue = (inputs) => {
		inputs.forEach(element => {
			element.addEventListener("change", (event) => {
				let isChecked = event.target.checked;
	
				if (planDuration === "yr") {
					if (element.classList.contains("online-service-checkbox")) {
						addOnsOnlineServiceActualValue = isChecked ? 10 : 0;
						displaySelectedAddOnsOnly(isChecked, "Online Service", addOnsOnlineServiceActualValue, planDuration);
					} else if (element.classList.contains("large-storage-checkbox")) {
						addOnsLargerStorageActualValue = isChecked ? 20 : 0;
						displaySelectedAddOnsOnly(isChecked, "Larger Storage", addOnsLargerStorageActualValue, planDuration);
					} else if (element.classList.contains("customizable-storage-checkbox")) {
						addOnsCustomizableStorageActualValue = isChecked ? 20 : 0;
						displaySelectedAddOnsOnly(isChecked, "Customizable Storage", addOnsCustomizableStorageActualValue, planDuration);
					}
				} else {
					// Monthly plan
					if (element.classList.contains("online-service-checkbox")) {
						addOnsOnlineServiceActualValue = isChecked ? 1 : 0;
						displaySelectedAddOnsOnly(isChecked, "Online Service", addOnsOnlineServiceActualValue, planDuration);
					} else if (element.classList.contains("large-storage-checkbox")) {
						addOnsLargerStorageActualValue = isChecked ? 2 : 0;
						displaySelectedAddOnsOnly(isChecked, "Larger Storage", addOnsLargerStorageActualValue, planDuration);
					} else if (element.classList.contains("customizable-storage-checkbox")) {
						addOnsCustomizableStorageActualValue = isChecked ? 2 : 0;
						displaySelectedAddOnsOnly(isChecked, "Customizable Storage", addOnsCustomizableStorageActualValue, planDuration);
					}
				}
			});
		});
	};
	

	const addOnsAddition = () => {
		const onlineServiceElement = document.querySelector(".add-ons-online-service");
		const largerStorageElement = document.querySelector(".add-ons-larger-storage");
		const customizableStorageElement = document.querySelector(".add-ons-customizable-storage");	

		const totalAmountDurationElement = document.querySelector(".total-amount-per-duration");
		const finishTotalAmountElement = document.querySelector(".finish-total-amount");

		let totalAmountDurationText = "Total (per ";

		let chosenPlanFinishElement = document.querySelector(".chosen-plan-finish-total");

		if (planCheckboxElement.checked) {
			chosenDurationDisplay = "Yearly";
			totalAmountDurationText += "year)";

			switch (parseInt(selectedPlanValue)) {
				case 90:
					chosenAddOnDisplay = "Arcade";
					chosenPlanFinishTotal = 90;
					break;
				case 120:
					chosenAddOnDisplay = "Advanced";
					chosenPlanFinishTotal = 120;
					break;
				case 150:
					chosenAddOnDisplay = "Pro";
					chosenPlanFinishTotal = 150;
					break;
			}
		} else {
			chosenDurationDisplay = "Monthly";
			totalAmountDurationText += "month)";

			switch (parseInt(selectedPlanValue)) {
				case 9:
					chosenAddOnDisplay = "Arcade";
					chosenPlanFinishTotal = 9;
					break;
				case 12:
					chosenAddOnDisplay = "Advanced";
					chosenPlanFinishTotal = 12;
					break;
				case 15:
					chosenAddOnDisplay = "Pro";
					chosenPlanFinishTotal = 15;
					break;
			}
		}

		onlineServiceElement.innerHTML = `+$${addOnsOnlineServiceDisplayValue}/${planDuration}`;
		largerStorageElement.innerHTML = `+$${addOnsLargerStorageDisplayValue}/${planDuration}`;
        customizableStorageElement.innerHTML = `+$${addOnsCustomizableStorageDisplayValue}/${planDuration}`;

		chosenPlanFinishElement.innerHTML = `$${chosenPlanFinishTotal}/${planDuration}`;

		totalAmountDurationElement.innerHTML = totalAmountDurationText;
		let finishTotalAmountValue = chosenPlanFinishTotal + (addOnsOnlineServiceActualValue + addOnsLargerStorageActualValue + addOnsCustomizableStorageActualValue);

		finishTotalAmountElement.innerHTML = `$${finishTotalAmountValue}/${planDuration}`;
	};

	const displaySelectedAddOnsOnly = (isSelected, name, amount, durationPlan) => {
		const mainContainer = document.querySelector(".chosen-add-ons");
		const existingContainer = mainContainer.querySelector(`[data-name="${name}"]`);
	
		if (isSelected) {
			if (existingContainer) {
				const spanPrice = existingContainer.querySelector("span:nth-child(2)");
				spanPrice.innerHTML = `+${amount}/${durationPlan}`;
				return;
			}
	
			const container = document.createElement("div");
			container.setAttribute("data-name", name);
	
			const addOnName = document.createElement("span");
			addOnName.innerHTML = name;
	
			const spanPrice = document.createElement("span");
			spanPrice.innerHTML = `+${amount}/${durationPlan}`;
			spanPrice.style.color = "hsl(213, 96%, 18%)";
	
			container.appendChild(addOnName);
			container.appendChild(spanPrice);
	
			mainContainer.appendChild(container);
		} else {
			if (existingContainer) {
				mainContainer.removeChild(existingContainer);
			}
		}
	};

	const backButton = (button, currentSection, prevSection) => {
		document.querySelector(button).addEventListener("click", () => {
			if (prevSection == ".select-plan") {
				planError.classList.add("hidden");
			}
			let currentSec = document.querySelector(currentSection);
			let previousSec = document.querySelector(prevSection);

			currentSec.classList.add("hidden", "animate__backOutRight");
			currentSec.classList.remove("animate__backInRight");

			previousSec.classList.remove("hidden", "animate__backOutLeft");
			previousSec.classList.add("animate__backInLeft");
		});
	};

	// Function to handle the label color change
    const checkboxBgOnChange = (checkbox, label) => {
        let checkboxElement = document.getElementById(checkbox);
        let labelElement = document.querySelector(label);

        checkboxElement.addEventListener("change", (event) => {
            let isChecked = event.target.checked;

            if (isChecked) {
                labelElement.classList.add("custom-label");
            } else {
                labelElement.classList.remove("custom-label");
            }
        });

        // labelElement.addEventListener("click", (event) => {
        //     checkboxElement.checked = !checkboxElement.checked;
        //     checkboxElement.dispatchEvent(new Event("change"));
        // });
    };

	$("form").validate();

	updatePlanLabels();

	validateInputsAndDisplayNextTab(".personal-info", "#validate-personal-info", ".personal-info", ".step-number-1", ".select-plan", ".step-number-2");
	validateInputsAndDisplayNextTab(".select-plan", "#validate-billing-type", ".select-plan", ".step-number-2", ".add-ons", ".step-number-3");
	validateInputsAndDisplayNextTab(".add-ons", "#validate-add-ons", ".add-ons", ".step-number-3", ".finishing-up", ".step-number-4");

	getSelectedAddOnValue(addOnElementsArray);
	
	updateCycleBills(false, ".arcade-plan-bill", ".advanced-plan-bill", ".pro-plan-bill");
	
	$("#billing-cycle").change(function () {
		updateCycleBills($(this).is(":checked"), ".arcade-plan-bill", ".advanced-plan-bill", ".pro-plan-bill");
		updatePlanLabels();
	});
	backButton("#btn-back-bill-type", ".select-plan", ".personal-info");
	backButton("#btn-back-add-ons", ".add-ons", ".select-plan");
	backButton("#btn-back-finish-up", ".finishing-up", ".add-ons");

	$("form").submit(function (event) {
		event.preventDefault();

		$.ajax({
			type: "POST",
			url: '/Home/Index',
			data: $(this).serialize(),
			success: function (response) {
				$(".personal-info").addClass("hidden");
				$(".select-plan").addClass("hidden");
				$(".add-ons").addClass("hidden");
				$(".finishing-up").addClass("hidden");

				$(".success").removeClass("hidden").html(response);
				$(".success").addClass("animate__animated animate__backInDown");
			},
			error: function (xhr, status, error) {
				console.log("AJAX error:", error);
				alert("Error: " + xhr.status + " - " + xhr.statusText);
			}
		})
	})
});
