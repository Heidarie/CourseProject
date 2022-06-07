namespace CoursesAPI.Models.Loans
{
    public interface ILoanModel
    {
        public User UserId { get; set; }
        public DateTime LoanFrom { get; set; }
        public DateTime LoanTo { get; set; }
        public int LoanDaysSummary { get; set; }
        public Car Car { get; set; }
        public int CalculateLoaningDays(DateTime LoanFrom, DateTime LoanTo);
    }
}
