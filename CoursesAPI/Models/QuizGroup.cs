namespace CoursesAPI.Models
{
    public class QuizGroup
    {
        [Key]
        [Column(TypeName = "uniqueidentifier")]
        public Guid Id { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string GroupName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Author { get; set; }
        [Column(TypeName = "image")]
        public string? Image { get; set; }
        public ICollection<Quiz> Quizzes { get; set; }

    }
}
