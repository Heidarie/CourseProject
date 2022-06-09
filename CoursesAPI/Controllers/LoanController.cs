using CoursesAPI.Models;
using CoursesAPI.Models.Calendar;
using CoursesAPI.Models.Loans;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoursesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : BaseController
    {
        [Authorize]
        [HttpPost]
        [Route("create-reservation")]
        public IActionResult CreateReservation([FromBody] ReservationModel model)
        {
            bool result = DatabaseManager.CreateReservation(this.UserEmail,model);
            DatabaseManager.Dispose();
            if (result)
                return Ok(new Response { Status = "Created", Message = "Rezerwacja przyjęta"});
            return BadRequest(new Response { Status = "Faulted", Message = "Wystąpił błąd podczas tworzenia rezerwacji" });
        }

        [HttpGet]
        [Route("get-calendar/{id}")]
        public List<DayModel> GetCalendar(string id)
        {
            return DatabaseManager.GetCarReservationDays(id);
        }
    }
}
