using Microsoft.EntityFrameworkCore;
using SkillTracker.Api.Models;

namespace SkillTracker.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // This is where you configure table mappings
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map the User entity to the lowercase "users" table
            modelBuilder.Entity<User>();
            modelBuilder.Entity<Department>().ToTable("departments");
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }

    }
}
