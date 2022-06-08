﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoursesAPI.Models
{
    public class User : IdentityUser
    {
        [Column(TypeName = "nvarchar(50)")]
        public string GivenName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string FamilyName { get; set; }
        [Column(TypeName = "integer")]
        public int PeselNumber { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        //public DateTime? PremiumAccountExpiryTime { get; set; }

    }
}