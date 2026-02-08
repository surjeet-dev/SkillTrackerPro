using Microsoft.AspNetCore.Mvc;
using SkillTracker.Api.Data;
using SkillTracker.Api.Models;

namespace SkillTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/users
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _context.Users.ToList();
            return Ok(
                new
                {
                    message = "User list retrieved successfully",
                    data = users 
                }
            );
        }

        // POST /api/users
        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            //var user = _context.Users.Add();
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, new
            {
                message = "New user created",
                data = user
            });

        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User updatedUser)
        {
            // Step 1: Find the existing user in the database
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound(); // Step 2: If not found, return 404
            }

            // Step 3: Update properties
            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;

            // Step 4: Save changes to database
            _context.SaveChanges();

            // Step 5: Return updated user
            return Ok(new { message = "User updated successfully", data = user });
        }

        // DELETE /api/users/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            // Step 1: Find the user by ID
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound(); // Step 2: Return 404 if not found
            }

            // Step 3: Remove the user from DbSet
            _context.Users.Remove(user);

            // Step 4: Save changes to database
            _context.SaveChanges();

            // Step 5: Return 204 No Content
            return Ok(new { message = $"User with ID {id} deleted successfully" });
        }

    }

}
