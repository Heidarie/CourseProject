namespace CoursesAPI.Models.Quizes
{
    public class QuizModel
    {
        public QuizModel(string question, int correctAnswersNumber, List<string> answers)
        {
            Id = Guid.NewGuid();
            Question = question;
            CorrectAnswersNumber = correctAnswersNumber;
            Answers = answers;
        }

        public Guid Id { get; set; }
        public string Question { get; set; }
        public int CorrectAnswersNumber { get; set; }
        public List<string> Answers { get; set; }
    }
}
