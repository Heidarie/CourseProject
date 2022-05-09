namespace CoursesAPI.Models.Flashcards
{
    public class FlashcardGroupModel
    {
        public FlashcardGroupModel()
        {

        }
        public FlashcardGroupModel(FlashcardsGroup flashcardGroup)
        {
            Id = flashcardGroup.Id;
            Name = flashcardGroup.GroupName;
            Author = flashcardGroup.Author;
            Image = flashcardGroup.Image;
            Flashcards = flashcardGroup.Flashcards != null ? flashcardGroup.Flashcards.Select(x => new FlashcardModel(x)).ToList() : null;
        }
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Author { get; set; }
        public string? Image { get; set; }
        public List<FlashcardModel>? Flashcards { get; set; }
    }
}
