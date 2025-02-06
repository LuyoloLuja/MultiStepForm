using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiStepForm.Dto
{
    public class UserDto
    {
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public int BillType { get; set; }
    public bool BillCycle { get; set; }
    public int OnlineService { get; set; }
    public int LargerStorage { get; set; }
    public int CustomizableStorage { get; set; }
    public int Total { get; set; } 
    }
}