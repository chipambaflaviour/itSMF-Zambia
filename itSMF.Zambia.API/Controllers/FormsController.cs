using Microsoft.AspNetCore.Mvc;
using itSMF.Zambia.API.Data;
using itSMF.Zambia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace itSMF.Zambia.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FormsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("membership")]
        public async Task<IActionResult> SubmitMembership([FromBody] MembershipApplication application)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.MembershipApplications.Add(application);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Membership application submitted successfully." });
        }

        [HttpPost("benchmarking")]
        public async Task<IActionResult> SubmitBenchmarking([FromBody] BenchmarkingRegistration registration)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.BenchmarkingRegistrations.Add(registration);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Benchmarking registration submitted successfully." });
        }

        [HttpPost("partnership")]
        public async Task<IActionResult> SubmitPartnership([FromBody] PartnershipApplication application)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.PartnershipApplications.Add(application);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Partnership application submitted successfully." });
        }

        [HttpPost("speaker-proposal")]
        public async Task<IActionResult> SubmitSpeakerProposal([FromBody] SpeakerProposal proposal)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.SpeakerProposals.Add(proposal);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Speaker proposal submitted successfully." });
        }

        [HttpPost("event-registration")]
        public async Task<IActionResult> SubmitEventRegistration([FromBody] EventRegistration registration)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.EventRegistrations.Add(registration);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event registration submitted successfully." });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] PortalUser user)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Simple validation check
            var existingUser = await _context.PortalUsers.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "User with this email already exists." });
            }

            // Note: In production, password should be hashed before saving
            // user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            _context.PortalUsers.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _context.PortalUsers.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            
            // Note: In production, use BCrypt.Net.BCrypt.Verify to check hashed password
            if (user == null || user.PasswordHash != loginDto.Password)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // Here we would typically generate and return a JWT token
            return Ok(new { message = "Login successful.", user = new { user.FullName, user.Email } });
        }
    }

    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
