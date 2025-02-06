namespace MultiStepForm.Models;

public class BillingCycleModel
{
    public Guid Id { get; set; }
    public bool IsYearly { get; set; }
    public Guid UserId { get; set; }
}
