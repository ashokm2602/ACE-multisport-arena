namespace Ace_Turf_Backend.DTOs.Bookings;

public class BookingResponse
{
    public long Id { get; set; }

    public DateTime BookingDate { get; set; }

    public string Status { get; set; } = string.Empty;

    public decimal TotalAmount { get; set; }

    public List<BookingItemResponse> BookingItems { get; set; }
        = new();
}