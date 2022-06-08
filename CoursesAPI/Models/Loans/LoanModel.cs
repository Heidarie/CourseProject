namespace CoursesAPI.Models.Loans
{
    public class LoanModel : ILoanModel
    {
        public LoanModel(User userId, DateTime loanFrom, DateTime loanTo, Car car)
        {
            UserId = userId;
            LoanFrom = loanFrom;
            LoanTo = loanTo;
            LoanDaysSummary = CalculateLoaningDays(loanFrom,loanTo);
            Car = car;
        }

        public User UserId { get; set; }
        public DateTime LoanFrom { get; set; }
        public DateTime LoanTo { get; set; }
        private int LoanDaysSummary { get; set; }
        public Car Car { get ; set ; }

        private int CalculateLoaningDays(DateTime LoanFrom, DateTime LoanTo)
        {
            var days = LoanTo - LoanFrom;
            return days.Days;
        }
    }
}
