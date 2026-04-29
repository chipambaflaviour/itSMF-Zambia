using System;
using System.ComponentModel.DataAnnotations;

namespace itSMF.Zambia.API.Models
{
    public class Partner
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [MaxLength(100)]
        public string PartnerType { get; set; } = string.Empty; // ATO, Corporate, NGO, International

        [MaxLength(500)]
        public string? LogoUrl { get; set; }
        
        [MaxLength(500)]
        public string? WebsiteUrl { get; set; }
    }
}
