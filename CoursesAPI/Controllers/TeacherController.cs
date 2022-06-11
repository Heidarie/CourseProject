using CoursesAPI.Models.Cars;
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
            return DatabaseManager.GetAvailableCarList();
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
    }
}
