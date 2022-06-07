using static CoursesAPI.Models.Enums;

namespace CoursesAPI.Models.Cars
{
    public interface ICarModel
    { 
        public float PricePerDay { get; set; }
        public string Description { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string FuelType { get; set; }
        public string Gearbox { get; set; }
        public string Drive { get; set; }
        protected IFormFile Image { get; set; }
        public string CarCategory { get; set; }
        protected string ConvertImage(IFormFile image);
        protected int GetStatusId(CarStatus status);
    }
}
