using CoursesAPI.Models;
using CoursesAPI.Models.DbEntity;
using CoursesAPI.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static CoursesAPI.Models.Enums;

namespace CoursesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public UserController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<UserModel> GetUserDetails()
        {

            User user = await _userManager.FindByEmailAsync(this.UserEmail);
            var userRoles = await _userManager.GetRolesAsync(user);
            UserModel userModel = new UserModel(user);

            userModel.Role = userRoles.Contains(RoleList.Admin.ToString()) ? "Administrator" :
                userRoles.Contains(RoleList.Teacher.ToString()) ? "Prowadzący" :
                userRoles.Contains("StudentPremium") ? "Abonament" :
                userRoles.Contains(RoleList.Student.ToString()) ? RoleList.Student.ToString() : "";

            return userModel;
        }
    }
}
