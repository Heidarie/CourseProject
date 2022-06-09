namespace CoursesAPI.Models.Loans
{
    public class ReservationModel
    {
        public string CarId { get; set; }
        public DateTime LoanFrom { get; set; }
        public DateTime LoanTo { get; set; }

    }
}
