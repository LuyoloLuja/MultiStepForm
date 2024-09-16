namespace MultiStepForm.Models;

public class MonthlyPlanModel
{
    public int Id { get; set; }
    public int Arcade { get; set; } = 9;
    public int Advanced { get; set; } = 12;
    public int Pro { get; set; } = 15;
    public Guid UserId { get; set; }
}
