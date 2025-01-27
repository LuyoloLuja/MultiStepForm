using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MultiStepForm.Models;

namespace MultiStepForm.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        FormViewModel model = new FormViewModel();
        model.AddOns = new AddOnsModel() {
            OnlineService = false,
            LargerStorage = false,
            CustomizableStorage = false
        };
        return View(model);
    }
}
