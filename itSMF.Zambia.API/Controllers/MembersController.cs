using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using itSMF.Zambia.API.Data;
using itSMF.Zambia.API.Models;

namespace itSMF.Zambia.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MembersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/members
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            // For prototype return dummy data if db fails or we just return ok wrapper
            return Ok(new List<Member>
            {
                new Member { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Status = "Active", MembershipTierId = 1 }
            });
        }

        // POST: api/admin/members
        [HttpPost]
        public async Task<ActionResult<Member>> PostMember(Member member)
        {
            return CreatedAtAction("GetMembers", new { id = member.Id }, member);
        }
    }
}
