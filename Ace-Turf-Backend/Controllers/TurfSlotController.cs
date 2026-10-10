using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ace_Turf_Backend.Models;
using Ace_Turf_Backend.Services;

namespace Ace_Turf_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurfSlotController : ControllerBase
    {
        private readonly ITurfSlotServicecs _turfSlotService;
        public TurfSlotController(ITurfSlotServicecs turfSlotService)
        {
            _turfSlotService = turfSlotService;
        }
        [HttpGet("turfSlot/GetAll")]
        public async Task<ActionResult<List<TurfSlot>>> GetAllTurfSlots()
        {
            var turfSlots = await _turfSlotService.GetAllTurfSlotsAsync();
            return Ok(turfSlots);
        }

        [HttpGet("turfSlot/GetById/{id}")]
        public async Task<ActionResult<TurfSlot>> GetTurfSlotById(long id)
        {
            var turfSlot = await _turfSlotService.GetTurfSlotByIdAsync(id);
            if (turfSlot == null)
            {
                return NotFound();
            }
            return Ok(turfSlot);
        }

        [HttpGet("turfSlot/GetByDate/{date}")]
        public async Task<ActionResult<List<TurfSlot>>> GetTurfSlotsByDate(DateTime date)
        {
            var turfSlots = await _turfSlotService.GetTurfSlotsByDateAsync(date);
            return Ok(turfSlots);
        }


        [HttpPost("turfSlot/Create")]
        public async Task<ActionResult<TurfSlot>> CreateTurfSlot([FromBody] DateTime date)
        {
            var turfSlot = await _turfSlotService.CreateTurfSlotAsync(date);
            return CreatedAtAction(nameof(GetTurfSlotById), new { id = turfSlot.Id }, turfSlot);
        }

        [HttpDelete("turfSlot/Delete/{id}")]
        public async Task<IActionResult> DeleteTurfSlot(long id)
        {
            await _turfSlotService.DeleteTurfSlotAsync(id);
            return NoContent();
        }

        [HttpPut("turfSlot/Update/{id}")]
        public async Task<ActionResult<TurfSlot>> UpdateTurfSlot(long id, [FromBody] TurfSlot turfSlot)
        {
            var updatedTurfSlot = await _turfSlotService.UpdateTurfSlotAsync(id, turfSlot);
            if (updatedTurfSlot == null)
            {
                return NotFound();
            }
            return Ok(updatedTurfSlot);
        }

        [HttpGet("turfSlot/GetAvailable/{date}")]
        public async Task<ActionResult<List<TurfSlot>>> GetAvailableTurfSlots(DateTime date)
        {
            var availableTurfSlots = await _turfSlotService.GetAvailableTurfSlotsAsync(date);
            return Ok(availableTurfSlots);
        }

        [HttpGet("turfSlot/GetBooked/{date}")]
        public async Task<ActionResult<List<TurfSlot>>> GetBookedTurfSlots(DateTime date)
        {
            var bookedTurfSlots = await _turfSlotService.GetBookedTurfSlotsAsync(date);
            return Ok(bookedTurfSlots);
        }

        [HttpPost("turfSlot/CreateForDate/{date}")]
        public async Task<IActionResult> CreateTurfSlotsForDate(DateTime date)
        {
            await _turfSlotService.CreateTurfSlotsForDateAsync(date);
            return Ok();
        }

        
    }
}
