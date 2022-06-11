using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static CoursesAPI.Models.Enums;

namespace CoursesAPI.Models.DbEntity
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext()
        {

        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(local)\\sqlexpress;Database=CarRental;Trusted_Connection=True");
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Car> Cars { get; set; } // Auta
        public DbSet<Loan> Loans { get; set; } // Wypożyczenia
        public DbSet<TeacherCar> TeacherCars { get; set; }
        public DbSet<AcceptedTraining> AcceptedTrainings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Loan>()
                .HasOne(x => x.User)
                .WithMany(e => e.Loans);

            builder.Entity<Loan>()
                .HasOne(x => x.Car)
                .WithMany(e => e.Loans);

            builder.Entity<TeacherCar>()
                .HasOne(x => x.Car)
                .WithMany(e => e.Teacher)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<TeacherCar>()
                .HasOne(x => x.User)
                .WithMany(e => e.TeacherCars)
                .OnDelete(DeleteBehavior.NoAction);

            base.OnModelCreating(builder);
        }
    }
}
