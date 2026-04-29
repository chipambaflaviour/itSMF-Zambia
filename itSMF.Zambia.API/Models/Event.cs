using System;
using System.ComponentModel.DataAnnotations;

namespace itSMF.Zambia.API.Models
{
    public class Event
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        public DateTime EventDate { get; set; }
        
        [MaxLength(200)]
        public string Location { get; set; } = string.Empty;
        
        public bool IsAnnualConference { get; set; }
        
        public string Status { get; set; } = "Upcoming"; // Upcoming, Past
    }
}
