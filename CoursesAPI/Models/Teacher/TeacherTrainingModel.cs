namespace CoursesAPI.Models.Teacher
{
    public class TeacherTrainingModel
    {
        public TeacherTrainingModel(Loan loan)
        {
            Car = loan.Car;
            TrainingDay = loan.LoanFrom;
        }
        public Car Car { get; set; }
        public DateTime TrainingDay { get; set; }
    }
}
