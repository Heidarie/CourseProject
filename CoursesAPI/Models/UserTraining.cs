using static CoursesAPI.Models.Enums;

namespace CoursesAPI.Models
{
    public class UserTraining
    {
        [Key]
        [Column(TypeName = "uniqueidentifier")]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid TrainingId { get; set; }
        public ParticipantTypeId? ParticitipantTypeId { get; set; }
    }
}
