namespace CoursesAPI.Models.Quizes
{
    public interface IQuizResult
    {
        public int Result { get; set; }
        public int MaxPoint { get; set; }
        public int Percentage { get; }
    }
}
