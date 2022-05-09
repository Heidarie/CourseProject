#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoursesAPI.Models;
using CoursesAPI.Models.DbEntity;
using CoursesAPI.Models.Quizes;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace CoursesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuizController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public QuizController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        private string userEmail { get; set; }
        public string UserEmail
        {
            get
            {
                if (userEmail == null)
                    userEmail = this.User.FindFirstValue(ClaimTypes.Email);
                return userEmail;
            }
        }

        

        // GET: api/Quiz
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuizGroupModel>>> GetQuizGroups()
        {
            var qGroups = await _context.QuizGroups.ToListAsync();
            List<QuizGroupModel> qGroupModel = qGroups.Select(x => new QuizGroupModel(x)).ToList();
            return qGroupModel;
        }

        // GET: api/Quiz/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuizGroupModel>> GetQuizGroup(Guid id)
        {
            var quizGroup = await _context.QuizGroups.FindAsync(id);

            if (quizGroup == null)
            {
                return NotFound();
            }
            quizGroup.Quizzes = _context.Quizzes.Where(x => x.QuizGroup == quizGroup).ToList();

            QuizGroupModel quiz = new QuizGroupModel(quizGroup);

            return quiz;
        }

        [HttpPost]
        [Route("create-quiz-group")]
        public async Task<IActionResult> CreateQuizGroup([FromBody] QuizGroupModel quizGroup)
        {
            QuizGroup qGroup = null;
            if (ModelState.IsValid)
            {
                string author = await GetAuthor();
                qGroup = new QuizGroup()
                {
                    Author = author,
                    GroupName = quizGroup.Name,
                    Id = Guid.NewGuid(),
                    Image = quizGroup.Image
                };

                qGroup.Quizzes = quizGroup.Quizzes.Select(x => new Quiz(x, qGroup)).ToList();
            }

            try
            {
                _context.QuizGroups.Add(qGroup);
                await _context.SaveChangesAsync();

                return Created("http://localhost:3000/QuizMenu", new QuizGroupModel(qGroup));
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        // POST: api/Quiz
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<QuizGroup>> PostQuizGroup(QuizGroup quizGroup)
        {
            _context.QuizGroups.Add(quizGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuizGroup", new { id = quizGroup.Id }, quizGroup);
        }

        // DELETE: api/Quiz/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuizGroup(Guid id)
        {
            var quizGroup = await _context.QuizGroups.FindAsync(id);
            if (quizGroup == null)
            {
                return NotFound();
            }

            _context.QuizGroups.Remove(quizGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuizGroupExists(Guid id)
        {
            return _context.QuizGroups.Any(e => e.Id == id);
        }

        private async Task<string> GetAuthor()
        {
            User user = await _userManager.FindByEmailAsync(this.UserEmail);
            return string.Format("{0} {1}", user.GivenName, user.FamilyName);
        }
    }
}
