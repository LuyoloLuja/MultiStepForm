namespace MultiStepForm.Models;

public class BillingCycleModel
{
    public int Id { get; set; }
    public bool IsYearly { get; set; } = false;
    public int UserId { get; set; }
}
