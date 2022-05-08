namespace CoursesAPI.Models
{
    public class Enums
    {
        public enum RoleList
        {
            Admin = 0,
            Teacher = 1,
            Student = 2
        }

        public enum ParticipantTypeId : int
        {
            Owner = 0,
            Participant = 1 
        }
    }
}
