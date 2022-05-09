namespace CoursesAPI.Models.Quizes
{
    public class QuizModel
    {
        public QuizModel()
        {

        }
        public QuizModel(Quiz quiz)
        {
            Id = quiz.Id;
            Question = quiz.Question;
            CorrectAnswersNumber = quiz.CorrectAnswersNumber;
            CorrectAnswers = quiz.CorrectAnswers.Split(",").ToList();
            Answers = quiz.Answers.Split(",").ToList();
        }
        public Guid Id { get; set; }
        public string Question { get; set; }
        public int CorrectAnswersNumber { get; set; }
        public List<string> CorrectAnswers { get; set; }
        public List<string> Answers { get; set; }
    }
}
