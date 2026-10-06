using System.ComponentModel.DataAnnotations;

namespace Ace_Multisports_backend.Models;

public class TurfSlot
{
    public long Id { get; set; }

    [Required]
    public DateTime SlotDate { get; set; }

    [Required]
    public TimeSpan StartTime { get; set; }

    [Required]
    public TimeSpan EndTime { get; set; }

    [Range(0, 999999.99)]
    public decimal Price { get; set; }

    public bool IsAvailable { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public ICollection<BookingItem> BookingItems { get; set; }
        = new List<BookingItem>();
}