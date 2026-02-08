namespace SkillTracker.Api.Models
{
    public class User
    {
        public int Id { get; set; }          // Primary Key
        public string Name { get; set; }     // Developer Name
        public string Email { get; set; }    // Unique Email

        public string PasswordHash { get; set; } = string.Empty; // Store hashed password
        public string Role { get; set; } = "User";               // Default role
    }

}
