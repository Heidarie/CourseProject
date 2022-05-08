namespace CoursesAPI.Models.Flashcards
{
    public class FlashcardGroup
    {
        public FlashcardGroup(string name, User user)
        {
            Id = Guid.NewGuid();
            Name = name;
            SetAuthorName(user);
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }

        public void SetAuthorName(User user) => this.Author = string.Format("{0} {1}", user.GivenName, user.FamilyName);
    }
}
