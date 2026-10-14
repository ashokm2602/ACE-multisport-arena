using Ace_Turf_Backend.DTOs.Bookings;

namespace Ace_Turf_Backend.Services
{
    public interface IBookingService
    {
        public Task<BookingResponse> CreateBookingAsync(BookingRequest request, long userId);
        public Task<BookingResponse> GetBookingByIdAsync(long bookingId, long userId);
        public Task<List<BookingResponse>> GetBookingsByUserIdAsync(long userId);
        public Task<List<BookingResponse>> GetAllBookingsAsync();
        public Task<BookingResponse> UpdateBookingStatusAsync(long bookingId, string status);
        public Task<BookingResponse> CancelBookingAsync(long bookingId, long userId);
        
    }
}
