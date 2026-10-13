namespace Ace_Turf_Backend.DTOs.Bookings;

public class BookingItemResponse
{
    public long Id { get; set; }

    public long TurfSlotId { get; set; }

    public DateTime StartDateTime { get; set; }

    public DateTime EndDateTime { get; set; }

    public decimal Price { get; set; }
}