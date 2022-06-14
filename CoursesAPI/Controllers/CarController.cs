using CoursesAPI.Models.Cars;
using CoursesAPI.Models.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

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
        public IActionResult CreateCar([FromForm] CarModel car)
        {
            car.YTMovie = RegexYtUrl(car.YTMovie);
            var result = DatabaseManager.CreateCar(car);
            if(result)
                return Ok();
            return NotFound();
        }

        [HttpPost]
        [Route("filter")]
        public IEnumerable<CarModel> FilterCars([FromBody] FilterModel filter)
        {
            return DatabaseManager.FilterCars(filter);
        }

        private string RegexYtUrl(string ytUrl)
        {
            string pattern = @"^(?:https?\:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v\=))([\w-]{10,12})(?:$|\&|\?\#).*";
            Regex regex = new Regex(pattern);
            Match match = regex.Match(ytUrl);
            return match.Groups[1].ToString();
        }
    }
}
