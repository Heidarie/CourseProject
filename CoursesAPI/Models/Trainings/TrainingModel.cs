namespace CoursesAPI.Models.Trainings
{
    public class TrainingModel
    {
        public TrainingModel()
        {

        }

        public TrainingModel(Training training)
        {
            Id = training.Id;
            OwnerId = training.OwnerId;
            Participants = training.Participants != null ? training.Participants.Split(",").ToList() : null;
            Title = training.Title;
            Description = training.Description;
            TrainingDetails = training.TrainingDetails.Select(x => new TrainingDetailsModel(x)).ToList();
            Author = training.Author;
        }

        public Guid? Id { get; set; }
        public Guid? OwnerId { get; set; }
        public string? Author { get; set; }
        public List<string>? Participants { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public List<TrainingDetailsModel>? TrainingDetails { get; set; }
    }
}
