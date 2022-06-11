using System.ComponentModel.DataAnnotations;

namespace CoursesAPI.Models
{
    public class Enums
    {
        public enum RoleList
        {
            [Display(Name = "Administrator")]
            Admin = 0,
            [Display(Name = "Nauczyciel")]
            Teacher = 1,
            [Display(Name = "Użytkownik")]
            User = 2
        }

        public enum CarStatus : int
        {
            Waiting = 0,
            Loaned = 1 
        }

        public enum CarCategories
        {
            Sportowe = 0,
            Suv = 1,
            Hatchback,
            Kombi,
            Limuzyna
        }

        public enum RentalType
        {
            Wypożyczenie = 0,
            Szkolenie = 1
        }
    }
}
