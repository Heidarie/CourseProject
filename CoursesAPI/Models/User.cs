using Microsoft.AspNetCore.Identity;

namespace CoursesAPI.Models
{
    public class User : IdentityUser
    {
        [Column(TypeName = "nvarchar(50)")]
        public string GivenName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string FamilyName { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public DateTime? PremiumAccountExpiryTime { get; set; }

    }
}
