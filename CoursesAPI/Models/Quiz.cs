using CoursesAPI.Models.Quizes;

namespace CoursesAPI.Models
{
    public class Quiz
    {
        public Quiz()
        {

        }

        public Quiz(QuizModel qModel, QuizGroup quizGroup)
        {
            Id = Guid.NewGuid();
            Question = qModel.Question;
            CorrectAnswersNumber = qModel.CorrectAnswersNumber;
            CorrectAnswers = string.Join(",",qModel.CorrectAnswers);
            Answers = string.Join(",",qModel.Answers);
            QuizGroup = quizGroup;
        }

        public Guid Id { get; set; }
        public string Question { get; set; }
        public int CorrectAnswersNumber { get; set; }
        public string CorrectAnswers { get; set; }
        public string Answers { get; set; }
        public QuizGroup QuizGroup { get; set; }
    }
}
