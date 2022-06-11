using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoursesAPI.Models
{
    public class User : IdentityUser
    {
        [Column(TypeName = "nvarchar(50)")]
        public string GivenName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string FamilyName { get; set; }
        [Column(TypeName = "bigint")]
        public long PeselNumber { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        
        public IEnumerable<Loan>? Loans { get; set; }

        public IEnumerable<TeacherCar>? TeacherCars { get; set; }

    }
}
