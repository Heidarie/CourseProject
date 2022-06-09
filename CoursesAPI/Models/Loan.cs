using System.ComponentModel.DataAnnotations;

namespace CoursesAPI.Models
{
    public class Loan
    {
        [Key]
        public Guid Id { get; set; }
        public User User { get; set; }
        public DateTime LoanFrom { get; set; }
        public DateTime LoanTo { get; set; }
        public int LoanDaysSummary { get; set; }
        public Car Car { get; set; } 

    }
}
