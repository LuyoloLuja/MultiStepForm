namespace MultiStepForm.Models;

public class FormViewModel
{
    public PersonalInfoModel PersonalInfo { get; set; }
    public BillingType BillingType { get; set; }
    public BillingCycleModel BillingCycle { get; set; }
    public MonthlyPlanModel MonthlyPlanModel { get; set; }
    public YearlyPlanModel YearlyPlanModel { get; set; }
}
