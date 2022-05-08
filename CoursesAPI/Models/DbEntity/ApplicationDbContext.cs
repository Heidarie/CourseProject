using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static CoursesAPI.Models.Enums;

namespace CoursesAPI.Models.DbEntity
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<FlashcardsGroup> FlashcardsGroups { get; set; }
        public DbSet<Flashcard> Flashcards { get; set; }
        public DbSet<UserTraining> UserTrainings { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<QuizGroup> QuizGroups { get; set; }
        public DbSet<TrainingDetails> TrainingsDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<UserTraining>()
                .Property(e => e.ParticitipantTypeId)
                .HasConversion<int>();
            
            builder
                .Entity<UserTraining>()
                .HasNoKey();

            builder
                .Entity<Training>()
                .HasMany(c => c.TrainingDetails)
                .WithOne(e => e.Training)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<QuizGroup>()
                .HasMany(c => c.Quizzes)
                .WithOne(e => e.QuizGroup)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder
                .Entity<FlashcardsGroup>()
                .HasMany(c => c.Flashcards)
                .WithOne(e => e.FlashcardsGroup)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(builder);
        }
    }
}
