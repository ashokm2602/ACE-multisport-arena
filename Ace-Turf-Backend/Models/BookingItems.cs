using System.ComponentModel.DataAnnotations;

namespace Ace_Turf_Backend.Models;

public class BookingItem
{
    public long Id { get; set; }

    [Required]
    public long BookingId { get; set; }

    [Required]
    public long TurfSlotId { get; set; }

    [Range(0, 999999.99)]
    public decimal Price { get; set; }

    public bool IsCancelled { get; set; } = false;

    // Navigation properties
    public Booking Booking { get; set; } = null!;

    public TurfSlot TurfSlot { get; set; } = null!;
}