using CoursesAPI.Builders;
using CoursesAPI.Extensions;
using CoursesAPI.Models;
using CoursesAPI.Models.Calendar;
using CoursesAPI.Models.Cars;
using CoursesAPI.Models.DbEntity;
using CoursesAPI.Models.Loans;
using CoursesAPI.Models.Teacher;
using CoursesAPI.Models.Users;
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
            List<Car> cars = this.GetCars();
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

        public bool CreateCar(CarModel model)
        {
            Car car = model.CreateCarEntity();
            return this.SaveToDatabase(car);
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
                int daysReseved = loan.LoanDaysSummary;
                for(int day = 0; day <= daysReseved; day++)
                {
                    dayModels.Add(modelBuilder.Build(observer));
                    observer = observer.AddDays(1);
                }
            }
            return dayModels;
        }

        public bool CreateReservation(string userMail,ReservationModel model, RentalType rentalType)
        {
            LoanBuilder loanBuilder = new LoanBuilder();
            Car car = this.GetCar(model.CarId);
            if (car == null)
                return false;
            User user = this.GetUser(userMail);
            Loan loan = loanBuilder.Build(model, user, car, rentalType);
            return this.SaveToDatabase(loan);
        }

        public IEnumerable<CarModel> GetAvailableCarList()
        {
            List<Car> cars = this.GetCars();
            IEnumerable<CarModel> carModels = cars.Where(x => x.Teacher.Count() < 4).Select(x => new CarModel(x)).ToList();
            return carModels;
        }

        public bool AssignTeacherToCar(string userMail, string carId)
        {
            User? user = this.GetUser(userMail);
            Car? car = this.GetCar(carId);
            if (user == null || car == null)
                return false;
            TeacherCar teacherCar = new TeacherCar(car,user);
            return this.SaveToDatabase(teacherCar);

        }
        
        public bool RemoveCarFromTeacher(string userMail, string carId)
        {
            User? user = this.GetUser(userMail);
            foreach(var car in user.TeacherCars)
            {
                car.Car = this.GetTeacherCar(car.Id.ToString());
            }
            if (user == null)
                return false;
            dbContext.TeacherCars.Remove(user.TeacherCars.First(x => x.Car.Id.ToString() == carId));
            return this.SaveToDatabase();
        }
        public IEnumerable<CarModel> GetTeacherCarList(string userMail)
        {
            User? user = this.GetUser(userMail);
            IEnumerable<Car> cars = GetAssignedCars();
            foreach(var car in cars)
            {
                foreach(var teacher in car.Teacher)
                {
                    if (teacher.User == user)
                        yield return new CarModel(car);
                }
            }
        }

        public IEnumerable<UserResevationModel> GetUserReservation(string userMail)
        {
            User? user = this.GetUser(userMail);
            IEnumerable<Loan> loans = dbContext.Loans.Where(x => x.User == user).ToList();
            return loans.Select(x => new UserResevationModel(x)).ToList();
        }

        public IEnumerable<TeacherTrainingModel> GetUserTrainingResevations(string userMail)
        {
            User? user = this.GetUser(userMail);
            IEnumerable<Loan> loans = dbContext.Loans.Where(x => x.User == user && x.LoanDaysSummary == 0).ToList();
            List<TeacherTrainingModel> model = new List<TeacherTrainingModel>();
            foreach (var loan in loans)
            {
                TeacherTrainingModel ttModel = model.FirstOrDefault(x => x.Car == loan.Car);
                if (ttModel == null)
                    ttModel = new TeacherTrainingModel() { Car = loan.Car };
                foreach(var l in loans.Where(x => x.Car == ttModel.Car))
                {
                    ttModel.TrainingDay.Add(loan.LoanFrom);
                }
                model.Add(ttModel);
            }
            return model;
        }

        private Car GetTeacherCar(string id)
        {
            TeacherCar car = dbContext.TeacherCars.Include(x => x.Car).Single(x => x.Id.ToString() == id);
            return car.Car;
        }

        private IEnumerable<Car> GetAssignedCars()
        {
            List<Car> cars = this.GetCars();
            foreach (Car car in cars)
            {
                if (car.Teacher != null)
                    yield return car;
            }
        }

        private List<Car> GetCars()
        {
            List<Car> cars = dbContext.Cars.Include(x => x.Teacher).ToList();
            return cars;
        }

        private User? GetUser(string mail)
        {
            return dbContext.Users.Include(x => x.TeacherCars).FirstOrDefault(x => x.Email == mail);
        }

        private Car? GetCar(string carId)
        {
            return dbContext.Cars.FirstOrDefault(x => x.Id.ToString() == carId);
        }

        private bool SaveToDatabase(object model = null)
        {
            if(model != null)
                dbContext.Add(model);
            return dbContext.SaveChanges() > 0 ? true : false;

        }

        public void Dispose()
        {
            this.dbContext.Dispose();
        }
    }
}
