$(document).ready(function () {
	const planCheckboxElement = document.querySelector("#billing-cycle");
	const monthlyLabel = document.querySelector("#monthly-label");
	const yearlyLabel = document.querySelector("#yearly-label");

	let planError = document.querySelector(".plan-text-danger");

	let arcadePlanRadioBtnValue = document.querySelector("#arcade-radio");
	let advancedPlanRadioBtnValue = document.querySelector("#advanced-radio");
	let proPlanRadioBtnValue = document.querySelector("#pro-radio");

	let addOnsOnlineServiceCheckboxElement = document.querySelector("#online-service-checkbox");
	let addOnsLargerStorageCheckboxElement = document.querySelector("#large-storage-checkbox");
	let addOnsCustomizableCheckboxElement = document.querySelector("#customizable-storage-checkbox");

	let planDuration = "";
	let chosenDurationDisplay = "";
	let chosenAddOnDisplay = "";

	let chosenPlanFinishTotal = 0;

	let selectedPlanValue = 0;

	let arcadeValue = 0;
	let advancedValue = 0;
	let proValue = 0;

	let addOnsOnlineServiceDisplayValue = 0;
	let addOnsLargerStorageDisplayValue = 0;
	let addOnsCustomizableStorageDisplayValue = 0;

	function updatePlanLabels() {
		if (planCheckboxElement.checked) {
			yearlyLabel.classList.add("active");
			monthlyLabel.classList.remove("active");
		} else {
			monthlyLabel.classList.add("active");
			yearlyLabel.classList.remove("active");
		}
	}

	updatePlanLabels();

	let updateAddOnsBills = (isYearly) => {
		const onlineServiceElement = document.querySelector(
			".add-ons-online-service"
		);
		const largerStorageElement = document.querySelector(
			".add-ons-larger-storage"
		);
		const customizableStorageElement = document.querySelector(
			".add-ons-customizable-storage"
		);

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

		const yearlyTwoMonthFree =
			document.querySelectorAll(".two-months-free");
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

	const validateInputsAndDisplayNextTab = (
		inputs,
		button,
		currentSection,
		currentSecNumber,
		followingSec,
		followingSecNumber
	) => {
		$(button).click(function () {
			let isValid = $(inputs).find("input").valid();

			if (currentSection == ".select-plan") {
				let selectedPlanElement = document.querySelector(
					'input[name="BillingType.BillType"]:checked'
				);

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
				// TO DO --- debug - check why label is not changing color
				// if (currentSection == ".add-ons") {
				// 	checkboxBgOnChange(
				// 		"online-service-checkbox",
				// 		".online-service-label"
				// 	);
				// }
				let sectionToHide = document.querySelector(currentSection);
				let stepNumberToHide = document.querySelector(currentSecNumber);

				let sectionToDisplay = document.querySelector(followingSec);
				let stepNumberToDisplay = document.querySelector(followingSecNumber);

				sectionToHide.classList.add("hidden");
				stepNumberToHide.classList.remove("step-number");

				sectionToDisplay.classList.remove("hidden");
				stepNumberToDisplay.classList.add("step-number");
			}
		});
	};

	const addOnsAddition = () => {
		const chosenAddOnElement = document.querySelector(
			".chosen-plan-selected-value"
		);

		let chosenPlanFinishElement = document.querySelector(
			".chosen-plan-finish-total"
		);

		if (planCheckboxElement.checked) {
			chosenDurationDisplay = "Yearly";

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
		chosenAddOnElement.innerHTML = `${chosenAddOnDisplay} (${chosenDurationDisplay})`;
		chosenPlanFinishElement.innerHTML = `$${chosenPlanFinishTotal}/${planDuration}`;

		addOnsOnlineServiceCheckboxElement.addEventListener("change", () => {
			let addOnsOnlineServiceActualValue = addOnsOnlineServiceCheckboxElement.checked;
			console.log(addOnsOnlineServiceActualValue);
			if(addOnsOnlineServiceActualValue == true) {
				displaySelectedAddOnsOnly(addOnsOnlineServiceActualValue, "Online Service", addOnsOnlineServiceDisplayValue, planDuration);
			}
		})
	};
	
	const displaySelectedAddOnsOnly = (isSelected, name, amount, durationPlan) => {
		const mainContainer = document.querySelector(".chosen-add-ons");
		const container = document.createElement("div");
		const addOnName = document.createElement("span");
		const spanPrice = document.createElement("span");

		if(isSelected) {
			addOnName.innerHTML = name;
			spanPrice.innerHTML = `+${amount}/${durationPlan}`;
			spanPrice.style.color = "hsl(213, 96%, 18%)";
	
			container.appendChild(addOnName);
			container.appendChild(spanPrice);
	
			mainContainer.appendChild(container);
		} else {
			container.remove();
		}
	}

	const backButton = (button, currentSection, prevSection) => {
		document.querySelector(button).addEventListener("click", () => {
			if (prevSection == ".select-plan") {
				planError.classList.add("hidden");
			}
			document.querySelector(currentSection).classList.add("hidden");
			document.querySelector(prevSection).classList.remove("hidden");
		});
	};

	// TO DO - check why my labels are not changing on click
	const checkboxBgOnChange = (checkbox, label) => {
		let checkboxElement = document.getElementById(checkbox);
		let labelElement = document.querySelector(label);

		// console.log(checkboxElement);
		// console.log(labelElement);

		// if (checkboxElement.checked == true) {
		//     labelElement.classList.add("custom-label");
		// } else {
		//     labelElement.classList.remove("custom-label");
		// }

		checkboxElement.addEventListener("change", (event) => {
			let isChecked = event.target.checked;

			console.log("isChecked " + isChecked);
			if (isChecked) {
				labelElement.classList.add("custom-label");
			} else {
				labelElement.classList.remove("custom-label");
			}
			console.log(labelElement);
		});

		// Handle clicks on the label itself to simulate a change
		labelElement.addEventListener("click", (event) => {
			checkboxElement.checked = !checkboxElement.checked; // Toggle checkbox state manually
			checkboxElement.dispatchEvent(new Event("change")); // Trigger the 'change' event
		});
	};

	$("form").validate();

	validateInputsAndDisplayNextTab(
		".personal-info",
		"#validate-personal-info",
		".personal-info",
		".step-number-1",
		".select-plan",
		".step-number-2"
	);
	validateInputsAndDisplayNextTab(
		".select-plan",
		"#validate-billing-type",
		".select-plan",
		".step-number-2",
		".add-ons",
		".step-number-3"
	);
	validateInputsAndDisplayNextTab(
		".add-ons",
		"#validate-add-ons",
		".add-ons",
		".step-number-3",
		".finishing-up",
		".step-number-4"
	);

	updateCycleBills(
		false,
		".arcade-plan-bill",
		".advanced-plan-bill",
		".pro-plan-bill"
	);

	$("#billing-cycle").change(function () {
		updateCycleBills(
			$(this).is(":checked"),
			".arcade-plan-bill",
			".advanced-plan-bill",
			".pro-plan-bill"
		);
		updatePlanLabels();
	});
	backButton("#btn-back-bill-type", ".select-plan", ".personal-info");
	backButton("#btn-back-add-ons", ".add-ons", ".select-plan");
	backButton("#btn-back-finish-up", ".finishing-up", ".add-ons");
});
