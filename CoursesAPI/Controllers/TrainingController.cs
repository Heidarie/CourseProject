﻿#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoursesAPI.Models;
using CoursesAPI.Models.DbEntity;
using CoursesAPI.Models.Trainings;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace CoursesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TrainingController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public TrainingController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Training
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Training>>> GetTrainings()
        {
            return await _context.Trainings.ToListAsync();
        }

        [HttpGet]
        [Route("get-training-details")]
        public async Task<ActionResult<TrainingModel>> GetTrainingsDetails([FromBody]string id)
        {
            var training = _context.Trainings.First(x => x.Id == Guid.Parse(id));
            training.TrainingDetails = _context.TrainingsDetails.Where(x => x.Training == training).ToList();

            return new TrainingModel(training);
        }

        [HttpGet]
        [Route("get-training-registration")]
        public async Task<ActionResult<TrainingDetailsModel>> GetTrainingRegistration([FromBody]string detailsId)
        {
            User user = await _userManager.FindByEmailAsync(this.UserEmail);

            TrainingDetails trainingDetails = _context.TrainingsDetails.Where(x => x.Id == Guid.Parse(detailsId)).Single();

            List<UserTraining> users = _context.UserTrainings.Where(x => x.TrainingId == Guid.Parse(detailsId)).ToList();

            TrainingDetailsModel trainingDetailsModel = new TrainingDetailsModel(trainingDetails);

            if(trainingDetails.ParticipantsRegistered >= trainingDetailsModel.ParticipantsLimit)
            {
                trainingDetailsModel.IsRegistrationOpen = false;
            }

            trainingDetailsModel.Registered = users.Any(x => x.UserId == Guid.Parse(user.Id));

            return trainingDetailsModel;
        }

        // PUT: api/Training/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("create-training")]
        [Authorize(Roles ="Teacher")]
        public async Task<IActionResult> CreateTraining(TrainingModel training)
        {
            User user = await _userManager.FindByEmailAsync(this.UserEmail);

            Training dbTraining = new Training()
            {
                Id = Guid.NewGuid(),
                OwnerId = Guid.Parse(user.Id),
                Description = training.Description,
                Title = training.Title,
            };

            dbTraining.TrainingDetails = training.TrainingDetails.Select(x => new TrainingDetails(x, dbTraining)).ToList();

            try
            {
                _context.Trainings.Add(dbTraining);
                await _context.SaveChangesAsync();
                return Ok(new Response { Status = "Created", Message = "Dodano szkolenie" });
            }
            catch (DbUpdateConcurrencyException)
            {
                    throw;
            }
        }

        // POST: api/Training
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] string id)
        {
            User user = await _userManager.FindByEmailAsync(this.UserEmail);

            _context.UserTrainings.Add(new UserTraining()
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(user.Id),
                TrainingId = Guid.Parse(id),
            });

            TrainingDetails trainingDetails = _context.TrainingsDetails.FirstOrDefault(x => x.Id == Guid.Parse(id));

            trainingDetails.ParticipantsRegistered += 1;

            _context.TrainingsDetails.Update(trainingDetails);

            _context.SaveChanges();

            return Ok(new Response { Status = "Added", Message = "Zapisano na kurs" });
        }

        // DELETE: api/Training/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTraining(Guid id)
        {
            var training = await _context.Trainings.FindAsync(id);
            if (training == null)
            {
                return NotFound();
            }

            _context.Trainings.Remove(training);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TrainingExists(Guid id)
        {
            return _context.Trainings.Any(e => e.Id == id);
        }
    }
}