using CoursesAPI.Extensions;
using CoursesAPI.Models;
using CoursesAPI.Models.Cars;
using CoursesAPI.Models.DbEntity;
using static CoursesAPI.Models.Enums;

namespace CoursesAPI
{
    public class DatabaseManager : IDisposable
    {
        ApplicationDbContext dbContext;
        public DatabaseManager()
        {
            dbContext = new ApplicationDbContext();
        }

        public IEnumerable<CarModel> GetCarList()
        {
            List<Car> cars = dbContext.Cars.ToList();
            return cars.Where(x => x.CarStatus != (int)CarStatus.Loaned).Select(x => new CarModel(x)).ToList();
        }

        public async Task<bool> CreateCar(CarModel model)
        {
            Car car = model.CreateCarEntity();
            dbContext.Add(car);
            var res = await dbContext.SaveChangesAsync();
            return res == 1 ? true : false;
        }

        public void Dispose()
        {
            this.dbContext.Dispose();
        }
    }
}
