using CoursesAPI.Models;
using CoursesAPI.Models.Cars;
using static CoursesAPI.Models.Enums;

namespace CoursesAPI.Extensions
{
    public static class CreateExtensions
    {
        public static Car CreateCarEntity(this CarModel model)
        {
            Car car = new Car()
            {
                Brand = model.Brand,
                Description = model.Description,
                Drive = model.Drive,
                FuelType = model.FuelType,
                Gearbox = model.Gearbox,
                Model = model.Model,
                PricePerDay = model.PricePerDay,
                Id = model.CreateGuid(),
                Image = model.Image.ReadAsString(),
                CarStatus = model.GetStatusId(CarStatus.Waiting),
                //jeśli jakimś cudem nie zostanie przekazany kategoria to podstawiamy puste
                CarCategory = Enum.Parse(typeof(CarCategories), model.CarCategory).ToString() ?? "",
                YTMovie = model.YTMovie
                
            };

            return car;
        } 
    }
}
