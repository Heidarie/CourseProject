namespace CoursesAPI.Models.Flashcards
{
    public class FlashcardMappedModel
    {
        public FlashcardMappedModel(FlashcardGroupModel flashcardGroup, List<FlashcardModel> flashcards)
        {
            FlashcardGroup = flashcardGroup;
            Flashcards = flashcards;
        }

        public FlashcardGroupModel FlashcardGroup { get; set; }
        public List<FlashcardModel> Flashcards { get; set; }
    }
}
