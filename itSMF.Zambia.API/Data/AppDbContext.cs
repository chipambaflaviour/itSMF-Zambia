using Microsoft.EntityFrameworkCore;
using itSMF.Zambia.API.Models;

namespace itSMF.Zambia.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Member> Members { get; set; }
        public DbSet<MembershipTier> MembershipTiers { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Partner> Partners { get; set; }
        public DbSet<Resource> Resources { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Seed placeholder membership tiers
            modelBuilder.Entity<MembershipTier>().HasData(
                new MembershipTier { Id = 1, Name = "Individual", Price = 800m, Benefits = "Access to resources, Discount on events" },
                new MembershipTier { Id = 2, Name = "Corporate", Price = 6000m, Benefits = "Group discount, Logo on website, Free conference pass" },
                new MembershipTier { Id = 3, Name = "Student", Price = 300m, Benefits = "Learning resources, Student community access" }
            );
        }
    }
}
