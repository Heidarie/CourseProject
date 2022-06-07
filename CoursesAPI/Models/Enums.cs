using System.ComponentModel.DataAnnotations;

namespace CoursesAPI.Models
{
    public class Enums
    {
        public enum RoleList
        {
            [Display(Name = "Administrator")]
            Admin = 0,
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
    }
}
