using CoursesAPI.Builders;
using CoursesAPI.Extensions;
using CoursesAPI.Models;
using CoursesAPI.Models.Calendar;
using CoursesAPI.Models.Cars;
using CoursesAPI.Models.DbEntity;
using CoursesAPI.Models.Loans;
using Microsoft.EntityFrameworkCore;
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
            return cars.Select(x => new CarModel(x)).ToList();
        }

        public List<string> GetCarBrandsList()
        {
            List<string> carBrands = new List<string>();
            List<Car> cars = dbContext.Cars.ToList();
            foreach(Car car in cars)
            {
                if(!carBrands.Contains(car.Brand))
                    carBrands.Add(car.Brand);
            }
            return carBrands;
        }

        public async Task<bool> CreateCar(CarModel model)
        {
            Car car = model.CreateCarEntity();
            dbContext.Add(car);
            var res = await dbContext.SaveChangesAsync();
            return res == 1 ? true : false;
        }

        public List<DayModel> GetCarReservationDays(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return null;
            }
            DayModelBuilder modelBuilder = new DayModelBuilder(); 
            List<DayModel> dayModels = new List<DayModel>();
            IEnumerable<Loan> carLoans = dbContext.Loans.Include(l => l.Car).Where(l => l.Car.Id.ToString() == id).ToList();
            foreach(Loan loan in carLoans)
            {
                DateTime observer = loan.LoanFrom;
                for(int day = 1; day <= (loan.LoanTo.Day - loan.LoanFrom.Day); day++)
                {
                    dayModels.Add(modelBuilder.Build(observer));
                    observer = observer.AddDays(day);
                }
            }
            return dayModels;
        }

        public bool CreateReservation(string userMail,ReservationModel model)
        {
            LoanBuilder loanBuilder = new LoanBuilder();
            Car car = dbContext.Cars.FirstOrDefault(x => x.Id.ToString() == model.CarId);
            if (car == null)
                return false;
            User user = dbContext.Users.FirstOrDefault(x => x.Email == userMail);
            Loan loan = loanBuilder.Build(model, user, car);
            dbContext.Loans.Add(loan);
            int res = dbContext.SaveChanges();
            return res == 1 ? true : false;
        }

        public void Dispose()
        {
            this.dbContext.Dispose();
        }
    }
}
