using System;
using System.ComponentModel.DataAnnotations;

namespace itSMF.Zambia.API.Models
{
    public class Resource
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        [MaxLength(100)]
        public string ResourceType { get; set; } = string.Empty; // Blog, CertificationGuide, CaseStudy

        [MaxLength(100)]
        public string Author { get; set; } = string.Empty;

        public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
        
        [MaxLength(500)]
        public string? LinkUrl { get; set; }
    }
}
