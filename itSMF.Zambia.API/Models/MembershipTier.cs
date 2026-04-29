using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace itSMF.Zambia.API.Models
{
    public class MembershipTier
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty; // Individual, Corporate, Student

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        
        public string? Benefits { get; set; } // Comma separated or serialized JSON
    }
}
