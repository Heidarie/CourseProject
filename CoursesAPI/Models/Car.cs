using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoursesAPI.Models
{
    public class Car
    {
        [Key]
        public Guid Id { get; set; }
        public float PricePerDay { get; set; }
        [Column(TypeName = "nvarchar(max)")]
        public string Description { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Brand { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Model { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string FuelType { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Gearbox { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Drive { get; set; }
        [Column(TypeName = "nvarchar(max)")]
        public string Image { get; set; }
        public int CarStatus { get; set; }
        public string CarCategory { get; set; }
        public IEnumerable<Loan> Loans { get; set; }
        public IEnumerable<TeacherCar> Teacher { get; set; }

    }
}
