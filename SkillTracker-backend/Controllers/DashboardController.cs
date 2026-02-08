using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillTracker.Api.Data;

namespace SkillTracker.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Dashboard
        [HttpGet]
        public async Task<ActionResult<object>> GetStats()
        {
            var totalUsers = await _context.Users.CountAsync();
            var totalDepartments = await _context.Departments.CountAsync();
            var lastUpdated = DateTime.Now;

            return new
            {
                totalUsers,
                totalDepartments,
                lastUpdated
            };
        }
    }
}
