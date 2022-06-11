using CoursesAPI.Models;
using CoursesAPI.Models.Loans;
using static CoursesAPI.Models.Enums;

namespace CoursesAPI.Builders
{
    public class LoanBuilder : IBuilder<Loan, ReservationModel, User, Car, RentalType>
    {
        private Loan _loan;
        public void Reset()
        {
            _loan = new Loan();
            _loan.Id = Guid.NewGuid();  
        }

        public Loan Build(ReservationModel paramOne, User paramTwo, Car paramThree, RentalType rentalType)
        {
            Reset();
            this.Update(paramOne, paramTwo, paramThree, rentalType);
            return this._loan;
        }


        public void Update(ReservationModel paramOne, User paramTwo, Car paramThree, RentalType rentalType)
        {
            if(_loan == null)
                Reset();
            _loan.Car = paramThree;
            _loan.User = paramTwo;
            _loan.LoanFrom = paramOne.LoanFrom > paramOne.LoanTo ? paramOne.LoanTo : paramOne.LoanFrom;
            _loan.LoanTo = paramOne.LoanTo > paramOne.LoanFrom ? paramOne.LoanTo : paramOne.LoanFrom;
            _loan.LoanDaysSummary = CalculateLoaningDays(paramOne.LoanFrom, paramOne.LoanTo);
            _loan.RentalType = (int)rentalType;
        }

        private int CalculateLoaningDays(DateTime LoanFrom, DateTime LoanTo)
        {
            return (int)(LoanTo- LoanFrom).TotalDays;
        }

        public void Update(Loan model, ReservationModel paramOne, User paramTwo, Car paramThree, RentalType rentalType)
        {
            model.Car = paramThree;
            model.User = paramTwo;
            model.LoanFrom = paramOne.LoanFrom;
            model.LoanTo = paramOne.LoanTo;
            model.LoanDaysSummary = CalculateLoaningDays(paramOne.LoanFrom, paramOne.LoanTo);
        }
    }
}
