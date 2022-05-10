namespace CoursesAPI.Models.Quizes
{
    public class QuizResultModel : IQuizResult
    {
        public int Result { get; set; }
        public int MaxPoint { get; set; }

        public double Percentage => (((double)Result / (double)MaxPoint) * 100);
    }
}
