using CoursesAPI.Models.Cars;
using CoursesAPI.Models.Teacher;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoursesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Teacher")]
    public class TeacherController : BaseController
    {
        [HttpGet]
        [Route("available-cars")]
        public IEnumerable<CarModel> GetAvailableCarList()
        {
            return DatabaseManager.GetAvailableCarList(this.UserEmail);
        }
        [HttpGet]
        [Route("teacher-cars")]
        public IEnumerable<CarModel> GetTeacherCarList()
        {
            return DatabaseManager.GetTeacherCarList(this.UserEmail);
        }

        [HttpPost]
        [Route("assign/{carId}")]
        public IActionResult AssignTeacherToCar(string carId)
        {
            var result = DatabaseManager.AssignTeacherToCar(this.UserEmail, carId);
            if (result == true)
                return Ok();
            return BadRequest();
        }

        [HttpPost]
        [Route("remove/{carId}")]
        public IActionResult RemoveCarFromTeacher(string carId)
        {
            var result = DatabaseManager.RemoveCarFromTeacher(this.UserEmail, carId);
            if (result == true)
                return Ok();
            return BadRequest();
        }

        [HttpPost]
        [Route("accept/{reservationId}")]
        public IActionResult AcceptTraining(string reservationId)
        {
            bool result = DatabaseManager.AcceptTraining(this.UserEmail, reservationId);
            if (result)
                return Ok();
            return BadRequest();
        }

        [HttpGet]
        [Route("get-reservations-request")]
        [Authorize(Roles = "Teacher")]
        public IEnumerable<TeacherTrainingModel> GetUserTrainingResevations() // zwraca listę zgłoszeń na szkolenia
        {
            return DatabaseManager.GetUserTrainingResevations(this.UserEmail);
        }

        [HttpGet]
        [Route("get-schedule")]
        [Authorize(Roles = "Teacher")]
        public IEnumerable<TeacherTrainingModel> GetTeacherSchedule() // zwraca listę szkoleń zaakceptowanych przez usera w roli TEACHER
        {
            return DatabaseManager.GetUserSchedule(this.UserEmail);
        }
    }
}
