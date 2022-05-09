namespace CoursesAPI.Models
{
    public class FlashcardsGroup
    {
        [Key]
        [Column(TypeName = "uniqueidentifier")]
        public Guid Id { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string? GroupName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? Author { get; set; }
        [Column(TypeName = "image")]
        public string? Image { get; set; }
        public ICollection<Flashcard>? Flashcards { get; set; }

    }
}
