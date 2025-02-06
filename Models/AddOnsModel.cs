namespace MultiStepForm.Models;

public class AddOnsModel
{
    public Guid Id { get; set; }
    public bool OnlineService { get; set; }
    public bool LargerStorage { get; set; }
    public bool CustomizableStorage { get; set; }
    public Guid UserId { get; set; }
}
