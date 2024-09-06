namespace MultiStepForm.Models;

public class FormViewModel
{
    public PersonalInfoModel PersonalInfo { get; set; }
    public BillingType BillingType { get; set; }
    public MonthlyPlanModel MonthPlanModel { get; set; }
    public YearlyPlanModel YearlyPlanModel { get; set; }
}
