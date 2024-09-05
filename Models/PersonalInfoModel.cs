using System.ComponentModel.DataAnnotations;

namespace MultiStepForm.Models;

public class PersonalInfoModel
{
    public int Id { get; set; }

    [Required(ErrorMessage = "This field is required")]
    public string? Name { get; set; }

    [Required(ErrorMessage = "This field is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "This field is required")]
    [Phone(ErrorMessage = "Invalid phone number")]
    [Display(Name = "Phone Number")]
    public string? PhoneNumber { get; set; }
}
