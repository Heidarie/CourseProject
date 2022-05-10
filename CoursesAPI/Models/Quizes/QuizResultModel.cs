namespace CoursesAPI.Models.Quizes
{
    public class QuizResultModel : IQuizResult
    {
        public int Result { get; set; }
        public int MaxPoint { get; set; }

        public int Percentage => (int)Math.Round((((double)Result / (double)MaxPoint) * 100),0);
    }
}
