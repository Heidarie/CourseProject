using CoursesAPI.Models.Trainings;

namespace CoursesAPI.Models
{
    public class TrainingDetails
    {
        public TrainingDetails()
        {

        }

        public TrainingDetails(TrainingDetailsModel model, Training training)
        {
            Id = Guid.NewGuid();
            EventDateTime = model.EventDateTime;
            ParticipantsLimit = model.ParticipantsLimit;
            Training = training;
        }
        [Key]
        public Guid Id { get; set; }
        public DateTime EventDateTime { get; set; }
        public int ParticipantsRegistered { get; set; }
        public int ParticipantsLimit { get; set; }
        public Training Training { get; set; }
    }
}
