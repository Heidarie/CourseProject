namespace CoursesAPI.Models.Quizes
{
    public class QuizGroupModel
    {
        public QuizGroupModel()
        {

        }
        public QuizGroupModel(QuizGroup qGroup)
        {
            Id = qGroup.Id;
            Name = qGroup.GroupName;
            Author = qGroup.Author;
            Quizzes = qGroup.Quizzes != null ? qGroup.Quizzes.Select(x => new QuizModel(x)).ToList() : null;
        }

        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Author { get; set; }
        public string? Image { get; set; }
        public List<QuizModel>? Quizzes { get; set; }
    }
}
