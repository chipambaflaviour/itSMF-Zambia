using System;
using System.ComponentModel.DataAnnotations;

namespace itSMF.Zambia.API.Models
{
    public class Member
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(200)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? PhoneNumber { get; set; }

        public int MembershipTierId { get; set; }
        public MembershipTier? MembershipTier { get; set; }

        public string Status { get; set; } = "Pending"; // Active, Pending, Expired
        
        public DateTime JoinedDate { get; set; } = DateTime.UtcNow;
    }
}
