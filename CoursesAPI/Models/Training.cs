namespace CoursesAPI.Models
{
    public class Training
    {
        [Key]
        public Guid Id { get; set; }
        [Column(TypeName = "uniqueidentifier")]
        public Guid OwnerId { get; set; }
        [Column(TypeName = "nvarchar(max)")]
        public string Author { get; set; }
        public string? Participants { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Description { get; set; }
        public ICollection<TrainingDetails> TrainingDetails { get; set; }
    }
}
