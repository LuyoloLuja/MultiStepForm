namespace MultiStepForm.Models;

public class YearlyPlanModel
{
    public int Id { get; set; }
    public int Arcade { get; set; } = 90;
    public int Advanced { get; set; } = 120;
    public int Pro { get; set; } = 150;
    public int UserId { get; set; }
}
