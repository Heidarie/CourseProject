using System.ComponentModel.DataAnnotations;
using static CoursesAPI.Models.Enums;

namespace CoursesAPI.Models.Account
{
    public class RegisterModel
    {
        [EmailAddress]
        [Required(ErrorMessage = "Adres Email jest wymagany")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Hasło jest wymagane")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Wprowadź swoje imię")]
        [MaxLength(50)]
        public string GivenName { get; set; }
        [Required(ErrorMessage = "Wprowadź swoje nazwisko")]
        [MaxLength (50)]
        public string FamilyName { get; set; }
        [Required(ErrorMessage = "Podaj numer pesel")]
        public long PeselNumber { get; set; }
        //[Required]
        //public RoleList Role { get; set; }
    }
}
