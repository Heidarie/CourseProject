namespace CoursesAPI.Models.Trainings
{
    public class TrainingDetailsModel
    {
        public TrainingDetailsModel()
        {

        }
        public TrainingDetailsModel(TrainingDetails trainingDetails)
        {
            Id = trainingDetails.Id;
            EventDateTime = trainingDetails.EventDateTime;
            ParticipantsRegistered = trainingDetails.ParticipantsRegistered;
            ParticipantsLimit = trainingDetails.ParticipantsLimit;
        }

        public Guid? Id { get; set; }
        public DateTime EventDateTime { get; set; }
        public int? ParticipantsRegistered { get; set; }
        public int ParticipantsLimit { get; set; }
        public bool? Registered { get; set; }
        public bool? IsRegistrationOpen { get; set; }
    }
}
