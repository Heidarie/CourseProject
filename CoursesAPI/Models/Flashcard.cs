global using System.ComponentModel.DataAnnotations;
global using System.ComponentModel.DataAnnotations.Schema;
using CoursesAPI.Models.Flashcards;

namespace CoursesAPI.Models
{
    public class Flashcard
    {
        public Flashcard(){ }
            

         
        public Flashcard(FlashcardModel flashcardModel, FlashcardsGroup flashcardsGroup)
        {
            Id = Guid.NewGuid();
            Key = flashcardModel.Key;
            Value = flashcardModel.Value;
            FlashcardsGroup = flashcardsGroup;
        }

        [Key]
        [Column(TypeName = "uniqueidentifier")]
        public Guid Id { get; set; }
        [Column(TypeName = "nvarchar(300)")]
        public string? Key { get; set; }
        [Column(TypeName = "nvarchar(300)")]
        public string? Value { get; set; }
        public FlashcardsGroup FlashcardsGroup { get; set; }
    }
}
