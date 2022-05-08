namespace CoursesAPI.Models.Flashcards
{
    public class FlashcardMapped
    {
        public FlashcardMapped(FlashcardGroup flashcardGroup, List<Flashcard> flashcards)
        {
            FlashcardGroup = flashcardGroup;
            Flashcards = flashcards;
        }

        public FlashcardGroup FlashcardGroup { get; set; }
        public List<Flashcard> Flashcards { get; set; }
    }
}
