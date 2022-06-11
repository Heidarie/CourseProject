using System.ComponentModel.DataAnnotations;

namespace CoursesAPI.Models
{
    public class AcceptedTraining
    {
        [Key]
        public Guid Id { get; set; }
        public User User { get; set; }
        public Loan Loan { get; set; }
    }
}
