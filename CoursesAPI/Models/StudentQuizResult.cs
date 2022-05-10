namespace CoursesAPI.Models
{
    public class StudentQuizResult
    {
        [Key]
        [Column(TypeName = "uniqueidentifier")]
        public Guid Id { get; set; }
        public string StudentId { get; set; }
        public Guid QuizId { get; set; }
        public int GatheredPoints { get; set; }
        public int MaxPoints { get; set; }
        public int ResultPercentage { get; set; }
    }
}
