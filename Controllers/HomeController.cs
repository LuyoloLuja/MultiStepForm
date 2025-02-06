using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MultiStepForm.Dto;
using MultiStepForm.Models;

namespace MultiStepForm.Controllers;

public class HomeController : Controller
{
    List<UserDto> users = new List<UserDto>();

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Index(FormViewModel model)
    {
        if(ModelState.IsValid)
        {
            var existingUser = users.FirstOrDefault(m => m.Email == model.PersonalInfo.Email);

            if(existingUser == null) // user doesn't exist
            {
                model.PersonalInfo.Id = Guid.NewGuid();

                bool billCycleIsYearly = model.BillingCycle.IsYearly;
                int billTypeValue = model.BillingType.BillType;

                int onlineServiceAddOnValue = 0;
                int largerStorageAddOnValue = 0;
                int customizableStorageAddOnValue = 0;

                if(billCycleIsYearly)
                {
                    onlineServiceAddOnValue = model.AddOns.OnlineService ? 10 : 0;
                    largerStorageAddOnValue = model.AddOns.LargerStorage ? 20 : 0;
                    customizableStorageAddOnValue = model.AddOns.CustomizableStorage ? 20 : 0;
                } else
                {
                    onlineServiceAddOnValue = model.AddOns.OnlineService ? 1 : 0;
                    largerStorageAddOnValue = model.AddOns.LargerStorage ? 2 : 0;
                    customizableStorageAddOnValue = model.AddOns.CustomizableStorage ? 2 : 0;
                }

                UserDto user = new UserDto()
                {
                    Name = model.PersonalInfo.Name,
                    Email = model.PersonalInfo.Email,
                    PhoneNumber = model.PersonalInfo.PhoneNumber,
                    BillType = billTypeValue,
                    BillCycle = billCycleIsYearly,
                    OnlineService = onlineServiceAddOnValue,
                    LargerStorage = largerStorageAddOnValue,
                    CustomizableStorage = customizableStorageAddOnValue,
                    Total = billTypeValue + onlineServiceAddOnValue + largerStorageAddOnValue + customizableStorageAddOnValue
                };
                return PartialView("_SuccessMessage");
            }
        }
        return View(model);
    }
}
