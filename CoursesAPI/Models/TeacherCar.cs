using System.ComponentModel.DataAnnotations;

namespace CoursesAPI.Models
{
    public class TeacherCar
    {
        public TeacherCar()
        {

        }
        public TeacherCar(Car car, User user)
        {
            Id = Guid.NewGuid();
            Car = car;
            User = user;
        }
        [Key]
        public Guid Id { get; set; }
        public Car Car { get; set; }
        public User User { get; set; }
    }
}
