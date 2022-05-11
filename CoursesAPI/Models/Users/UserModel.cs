namespace CoursesAPI.Models.Users
{
    public class UserModel
    {
        public UserModel(User user)
        {
            GivenName = user.GivenName;
            FamilyName = user.FamilyName;
            PremiumExpiryDate = user.PremiumAccountExpiryTime;
            Email = user.Email;
        }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        public DateTime? PremiumExpiryDate { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }

    }
}
