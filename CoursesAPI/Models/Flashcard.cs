global using System.ComponentModel.DataAnnotations;
global using System.ComponentModel.DataAnnotations.Schema;

namespace CoursesAPI.Models
{
    public class Flashcard
    {
        [Key]
        [Column(TypeName = "uniqueidentifier")]
        public Guid Id { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public Guid Group { get; set; }
        [Column(TypeName = "nvarchar(300)")]
        public string Key { get; set; }
        [Column(TypeName = "nvarchar(300)")]
        public string Value { get; set; }
    }
}
