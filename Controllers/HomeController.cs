using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MultiStepForm.Models;

namespace MultiStepForm.Controllers;

public class HomeController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }
}
