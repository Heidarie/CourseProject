namespace CoursesAPI.Models.Flashcards
{
    public class FlashcardModel
    {
        public FlashcardModel(string key, string value)
        {
            Id = Guid.NewGuid();
            Key = key;
            Value = value;
        }

        public FlashcardModel(Flashcard flashcard)
        {
            Id = flashcard.Id;
            Key = flashcard.Key;
            Value = flashcard.Value;
        }

        public Guid? Id { get; set; }
        public string? Key { get; set; }
        public string? Value { get; set; }
    }
}
