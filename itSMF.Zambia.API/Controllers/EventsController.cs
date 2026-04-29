using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using itSMF.Zambia.API.Data;
using itSMF.Zambia.API.Models;

namespace itSMF.Zambia.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return Ok(new List<Event>
            {
                new Event { Id = 1, Title = "Annual Conference", Description = "The IT Service Management annual gathering.", EventDate = DateTime.Now.AddDays(30), Location = "Lusaka", Status = "Upcoming", IsAnnualConference = true }
            });
        }

        // POST: api/admin/events
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            return CreatedAtAction("GetEvents", new { id = @event.Id }, @event);
        }
    }
}
