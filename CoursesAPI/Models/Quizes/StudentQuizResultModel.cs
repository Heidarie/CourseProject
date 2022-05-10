namespace CoursesAPI.Models.Quizes
{
    public class StudentQuizResultModel
    {
        public StudentQuizResultModel(User user, QuizGroup quiz, StudentQuizResult result)
        {
            StudentName = String.Format("{0} {1}", user.GivenName, user.FamilyName);
            QuizName = quiz.GroupName;
            GatheredPoints = result.GatheredPoints;
            Percentage = (int)result.ResultPercentage;
        }

        public string StudentName { get; set; }
        public string QuizName { get; set; }
        public int GatheredPoints { get; set; }
        public int Percentage { get; set; }
    }
}
