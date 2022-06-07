using System.ComponentModel.DataAnnotations;

namespace CoursesAPI.Models.Account
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Podaj email")]
        public string? Email { get; set; }
        [Required(ErrorMessage ="Podaj hasło")]
        public string? Password { get; set; }
    }
}
