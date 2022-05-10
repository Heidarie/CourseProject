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
using CoursesAPI.Models.Flashcards;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace CoursesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FlashcardsGroupsController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        
        public FlashcardsGroupsController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/FlashcardsGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashcardGroupModel>>> GetFlashcardsGroups()
        {
            List<FlashcardsGroup> dbFlashcardsGroups = await _context.FlashcardsGroups.ToListAsync();
            List<FlashcardGroupModel> flashcardGroups = dbFlashcardsGroups.Select(e => new FlashcardGroupModel(e)).ToList();

            return flashcardGroups;
        }

        // GET: api/FlashcardsGroups/5
        [HttpGet("{id}")]
        [Authorize(Roles = "StudentPremium,Teacher")]
        public async Task<ActionResult<List<FlashcardModel>>> GetFlashcardsGroup(Guid id)
        {
            var flashcardsGroup = await _context.FlashcardsGroups.FindAsync(id);

            if (flashcardsGroup == null)
            {
                return NotFound();
            }

            flashcardsGroup.Flashcards = await _context.Flashcards.Where(x => x.FlashcardsGroup == flashcardsGroup).ToListAsync();

            List<FlashcardModel> fModelList = flashcardsGroup.Flashcards.Select(x => new FlashcardModel(x)).ToList();

            return fModelList;
        }

        [HttpPost]
        [Route("create-flashcards")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> CreateFlashcardsGroup([FromBody] FlashcardGroupModel flashcardsGroup)
        {
            if (ModelState.IsValid)
            {
                string author = await GetAuthor();
                FlashcardsGroup dbFlashcardGroup = new FlashcardsGroup()
                {
                    Id = Guid.NewGuid(),
                    Author = author,
                    GroupName = flashcardsGroup.Name,
                    Image = flashcardsGroup.Image
                };

                dbFlashcardGroup.Flashcards = flashcardsGroup.Flashcards.Select(x => new Flashcard(x, dbFlashcardGroup)).ToList();

                _context.FlashcardsGroups.Add(dbFlashcardGroup);
                _context.SaveChanges();
                return Ok(new Response { Status = "Created", Message = "Grupa fiszek została stworzona" });
            }
            return NoContent();
        }

        // POST: api/FlashcardsGroups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FlashcardsGroup>> AddFlashcardsToGroup([FromBody] FlashcardGroupModel flashcardsGroup)
        {

            var group = await _context.FlashcardsGroups.FindAsync(flashcardsGroup.Id);
            if (group == null)
                return NotFound();

            group.Flashcards = flashcardsGroup.Flashcards.Select(x => new Flashcard(x, group)).ToList();

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlashcardsGroup", new { id = flashcardsGroup.Id }, flashcardsGroup);
        }

        // DELETE: api/FlashcardsGroups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlashcardsGroup(Guid id)
        {
            var flashcardsGroup = await _context.FlashcardsGroups.FindAsync(id);
            if (flashcardsGroup == null)
            {
                return NotFound();
            }

            _context.FlashcardsGroups.Remove(flashcardsGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlashcardsGroupExists(Guid id)
        {
            return _context.FlashcardsGroups.Any(e => e.Id == id);
        }

        private async Task<string> GetAuthor()
        {
            User user = await _userManager.FindByEmailAsync(this.UserEmail);
            return string.Format("{0} {1}", user.GivenName, user.FamilyName);
        }

    }
}
