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
            Id = car.Id;
            PricePerDay = car.PricePerDay;
            Description = car.Description;
            Brand = car.Brand;
            Model = car.Model;
            FuelType = car.FuelType;
            Gearbox = car.Gearbox;
            Drive = car.Drive;
            ImageString = car.Image;
            CarCategory = car.CarCategory;
            TrainingAvailable = car.Teacher == null ? false : true;
        }
        public Guid Id { get; set; }
        public float PricePerDay { get; set; }
        public string Description { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string FuelType { get; set; }
        public string Gearbox { get; set; }
        public string Drive { get; set; }
        public IFormFile Image { get; set; }
        private string imageString;
        public string ImageString
        {
            get { return imageString ?? string.Empty; } // zwracaj image w formie string'a jeśli jest uzupełniony
            private set { imageString = value; } // private ponieważ jest ustawiany na podst. zmiennej interfejsowej Image
        }
        public string CarCategory { get; set; }
        public bool TrainingAvailable { get; set; }

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
