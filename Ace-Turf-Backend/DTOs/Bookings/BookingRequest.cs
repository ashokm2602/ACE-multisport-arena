using System.ComponentModel.DataAnnotations;

namespace Ace_Turf_Backend.DTOs.Bookings;

public class BookingRequest
{
    [Required]
    [MinLength(1, ErrorMessage = "Select at least one slot.")]
    public List<long> SlotIds { get; set; } = new();
}