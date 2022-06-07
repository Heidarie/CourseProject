using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CoursesAPI.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        private string userEmail { get; set; }
        private DatabaseManager databaseManager;
        protected string UserEmail
        {
            get
            {
                if (userEmail == null)
                    userEmail = this.User.FindFirstValue(ClaimTypes.Email);
                return userEmail;
            }
        }

        protected DatabaseManager DatabaseManager
        {
            get
            {
                if (databaseManager == null)
                {
                    databaseManager = new DatabaseManager();
                }
                return databaseManager;
            }
        }

    }
}
