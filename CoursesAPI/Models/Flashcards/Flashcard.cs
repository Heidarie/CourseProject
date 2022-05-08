namespace CoursesAPI.Models.Flashcards
{
    public class Flashcard
    {
        public Flashcard(Guid groupId, string key, string value)
        {
            Id = Guid.NewGuid();
            Key = key;
            Value = value;
        }

        public Guid Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
