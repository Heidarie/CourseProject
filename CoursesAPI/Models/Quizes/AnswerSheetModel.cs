namespace CoursesAPI.Models.Quizes
{
    public class AnswerSheetModel
    {
        public Guid QuizId { get; set; }
        public List<QuizAnswerModel> Answers { get; set; }
    }

    public class QuizAnswerModel
    {
        public Guid Id { get; set; }
        public List<string> Answers { get; set; }
    }
}
