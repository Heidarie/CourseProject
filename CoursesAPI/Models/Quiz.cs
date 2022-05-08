namespace CoursesAPI.Models
{
    public class Quiz
    {
        public Guid Id { get; set; }
        public string Question { get; set; }
        public int CorrectAnswersNumber { get; set; }
        public string CorrectAnswers { get; set; }
        public string Answers { get; set; }
        public QuizGroup QuizGroup { get; set; }
    }
}
