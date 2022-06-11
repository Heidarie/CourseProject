namespace CoursesAPI.Models.Users
{
    public class UserResevationModel
    {
        public UserResevationModel(Loan loan)
        {
            Car = loan.Car;
            From = loan.LoanFrom;
            To = loan.LoanTo;
        }
        public Car Car { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }

    }
}
