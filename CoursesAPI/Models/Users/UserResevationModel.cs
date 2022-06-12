using CoursesAPI.Models.Cars;

namespace CoursesAPI.Models.Users
{
    public class UserResevationModel
    {
        public UserResevationModel(Loan loan)
        {
            Car = new CarModel(loan.Car);
            From = loan.LoanFrom;
            To = loan.LoanTo;
            SummaryPrice = (loan.Car.PricePerDay * loan.LoanDaysSummary);
        }
        public CarModel Car { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public float SummaryPrice { get; set; }

    }
}
