using CoursesAPI.Extensions;

namespace CoursesAPI.Models.Cars
{
    public class CarModel : ICarModel
    {
        public CarModel()
        {
        }

        public CarModel(Car car)
        {
            PricePerDay = car.PricePerDay;
            Description = car.Description;
            Brand = car.Brand;
            Model = car.Model;
            FuelType = car.FuelType;
            Gearbox = car.Gearbox;
            Drive = car.Drive;
            ImageString = car.Image;
            CarCategory = car.CarCategory;
        }

        public float PricePerDay { get; set; }
        public string Description { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string FuelType { get; set; }
        public string Gearbox { get; set; }
        public string Drive { get; set; }
        public IFormFile Image { get; set; }
        public string ImageString
        {
            get { return ImageString ?? string.Empty; } // zwracaj image w formie string'a jeśli jest uzupełniony
            private set { ImageString = ConvertImage(this.Image); } // private ponieważ jest ustawiany na podst. zmiennej interfejsowej Image
        }
        public string CarCategory { get; set; }

        public string ConvertImage(IFormFile image)
        {
            return image.ReadAsString();
        }

        public int GetStatusId(Enums.CarStatus status)
        {
            return (int)status;
        }

        public Guid CreateGuid()
        {
            return Guid.NewGuid();
        }
    }
}
