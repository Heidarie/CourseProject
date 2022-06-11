using CoursesAPI.Models.Cars;

namespace CoursesAPI.Models.Teacher
{
    public class TeacherTrainingModel
    {
        public TeacherTrainingModel()
        {
            TrainingDay = new List<DateTime>();
        }
        public CarModel Car { get; set; }
        public List<DateTime> TrainingDay { get; set; }
        public string ReservationId { get; set; }
    }
}
