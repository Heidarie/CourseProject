namespace CoursesAPI.Models
{
    public class TrainingDetails
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime EventDateTime { get; set; }
        public int ParticipantsRegistered { get; set; }
        public int ParticipantsLimit { get; set; }
        public Training Training { get; set; }
    }
}
