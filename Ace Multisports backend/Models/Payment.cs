using System.ComponentModel.DataAnnotations;

namespace Ace_Multisports_backend.Models;

public class Payment
{
    public long Id { get; set; }

    [Required]
    public long BookingId { get; set; }

    [Range(0.01, 999999.99)]
    public decimal Amount { get; set; }

    [Required]
    [StringLength(30)]
    public string PaymentMethod { get; set; } = null!;

    [StringLength(150)]
    public string? TransactionId { get; set; }

    [Required]
    [StringLength(30)]
    public string Status { get; set; } = "Pending";

    public DateTime? PaidAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public Booking Booking { get; set; } = null!;
}