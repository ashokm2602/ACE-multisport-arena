using System.ComponentModel.DataAnnotations;

namespace Ace_Turf_Backend.Models;

public class Booking
{
    public long Id { get; set; }

    [Required]
    public DateTime BookingDate { get; set; }

    [Required]
    [StringLength(30)]
    public string Status { get; set; } = "Pending";

    [Range(0, 999999.99)]
    public decimal TotalAmount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<BookingItem> BookingItems { get; set; }
        = new List<BookingItem>();

    public ICollection<Payment> Payments { get; set; }
        = new List<Payment>();
}