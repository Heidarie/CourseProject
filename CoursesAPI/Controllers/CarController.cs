using CoursesAPI.Models.Cars;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoursesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : BaseController
    {
        [HttpGet]
        [Route("car-list")]
        public IEnumerable<CarModel> GetCarList()
        {
            return DatabaseManager.GetCarList();
        }

        [HttpGet]
        [Route("get-car-brands")]
        public IEnumerable<string> GetCarBrands()
        {
            return DatabaseManager.GetCarBrandsList();
        }

        [HttpPost]
        [Route("create-car")]
        [Authorize(Roles ="Administrator")]
        public async Task<IActionResult> CreateCar([FromBody] CarModel car)
        {
            var result = await DatabaseManager.CreateCar(car);
            if(result)
                return Ok();
            return NotFound();
        }
    }
}
