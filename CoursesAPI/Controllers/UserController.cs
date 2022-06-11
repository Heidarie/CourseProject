using CoursesAPI.Models;
using CoursesAPI.Models.DbEntity;
using CoursesAPI.Models.Teacher;
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

            UserModel userModel = new UserModel(user) { Role = await GetRole(user) };

            return userModel;
        }

        [HttpGet]
        [Route("get-reservation")]
        [Authorize(Roles ="User")]
        public IEnumerable<UserResevationModel> GetUserResevations()
        {
            return DatabaseManager.GetUserReservation(this.UserEmail);
        }

        [HttpGet]
        [Route("get-reservation")]
        [Authorize(Roles = "Teacher")]
        public IEnumerable<TeacherTrainingModel> GetTeacherTrainingResevations()
        {
            return DatabaseManager.GetUserTrainingResevations(this.UserEmail);
        }

        [HttpPost]
        [Route("change-password")]
        public async Task<IActionResult> ChangePassword(UserPasswordModel model)
        {
            User user = await _userManager.FindByEmailAsync(this.UserEmail);
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                return Ok(new Response { Status = "Changed", Message = "Hasło zostało zmienione" });
            }
            return NotFound(new Response { Status = "Rejected", Message = "Hasła się nie zgadzają" });
        }

        [HttpGet]
        [Route("users-list")]
        [Authorize(Roles = "Admin")]
        public async Task<List<UserModel>> GetUsersList()
        {
            User admin = await _userManager.FindByEmailAsync(this.UserEmail);
            List<User> users = _context.Users.Where(x => x.Id != admin.Id).ToList();

            List<UserModel> userModels = users.Select(x => new UserModel(x)).ToList();

            return userModels;
        }

        [HttpPost]
        [Route("delete-user/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<List<UserModel>> RemoveUser(string id)
        {
            try
            {
                User user = await _userManager.FindByIdAsync(id);
                await _userManager.DeleteAsync(user);
                return await GetUsersList();
            }
            catch
            {
                throw;
            }
        }

        private async Task<string> GetRole(User user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            return userRoles.Contains(RoleList.Admin.ToString()) ? "Administrator" :
                userRoles.Contains(RoleList.Teacher.ToString()) ? "Instruktor" : "Użytkownik";
        }
    }
}
