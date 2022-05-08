namespace CoursesAPI.Models
{
    public class FlashcardsGroup
    {
        [Key]
        [Column(TypeName = "uniqueidentifier")]
        public Guid MyProperty { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string GroupName { get; set; }
        [Column(TypeName = "image")]
        public string Image { get; set; }
    }
}
