namespace CoursesAPI.Models.Quizes
{
    public class QuizGroupModel
    {
        public QuizGroupModel(string name, string author, List<QuizModel> quizzes)
        {
            Id = Guid.NewGuid();
            Name = name;
            Author = author;
            Quizzes = quizzes;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public List<QuizModel> Quizzes { get; set; }
    }
}
