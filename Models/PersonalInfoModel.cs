using System.ComponentModel.DataAnnotations;

namespace MultiStepForm.Models;

public class PersonalInfoModel
{
    public Guid Id { get; set; }

    [Required(ErrorMessage = "This field is required")]
    public string? Name { get; set; }

    [Required(ErrorMessage = "This field is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "This field is required")]
    [RegularExpression("^([0-9]{10})$", ErrorMessage = "Invalid Mobile Number.")]
    [Display(Name = "Phone Number")]
    public string? PhoneNumber { get; set; }
}
