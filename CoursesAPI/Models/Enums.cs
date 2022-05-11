namespace CoursesAPI.Models
{
    public class Enums
    {
        public enum RoleList
        {
            [Display(Name = "Administrator")]
            Admin = 0,
            [Display(Name = "Prowadzący")]
            Teacher = 1,
            [Display(Name = "Student")]
            Student = 2
        }

        public enum ParticipantTypeId : int
        {
            Owner = 0,
            Participant = 1 
        }
    }
}
