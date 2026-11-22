
using Ace_Turf_Backend.DTOs.Bookings;
using Ace_Turf_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Ace_Turf_Backend.Services
{
    public class BookingService : IBookingService
    {
        private readonly AppDbContext _context;

        public BookingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<BookingResponse> CreateBookingAsync(BookingRequest request, long userId)
        {
            ArgumentNullException.ThrowIfNull(request);

            if (request.SlotIds.Count == 0)
            {
                throw new ArgumentException("Select at least one slot.", nameof(request));
            }

            if (request.SlotIds.Distinct().Count() != request.SlotIds.Count)
            {
                throw new ArgumentException("Duplicate slot IDs are not allowed.", nameof(request));
            }

            var slots = await _context.TurfSlots
                .Where(slot => request.SlotIds.Contains(slot.Id))
                .ToListAsync();

            if (slots.Count != request.SlotIds.Count)
            {
                throw new InvalidOperationException("One or more selected slots do not exist.");
            }

            if (slots.Any(slot => !slot.IsAvailable))
            {
                throw new InvalidOperationException("One or more selected slots are unavailable.");
            }

            var slotsById = slots.ToDictionary(slot => slot.Id);
            var bookingItems = request.SlotIds
                .Select(slotId =>
                {
                    var slot = slotsById[slotId];
                    slot.IsAvailable = false;

                    return new BookingItem
                    {
                        TurfSlotId = slot.Id,
                        Price = slot.Price
                    };
                })
                .ToList();

            var booking = new Booking
            {
                BookingDate = DateTime.UtcNow,
                TotalAmount = bookingItems.Sum(item => item.Price),
                BookingItems = bookingItems
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return new BookingResponse
            {
                Id = booking.Id,
                BookingDate = booking.BookingDate,
                Status = booking.Status,
                TotalAmount = booking.TotalAmount,
                BookingItems = bookingItems
                    .Select(item =>
                    {
                        var slot = slotsById[item.TurfSlotId];
                        return new BookingItemResponse
                        {
                            Id = item.Id,
                            TurfSlotId = item.TurfSlotId,
                            StartDateTime = slot.SlotDate.Date + slot.StartTime,
                            EndDateTime = slot.SlotDate.Date + slot.EndTime
                                + (slot.EndTime <= slot.StartTime ? TimeSpan.FromDays(1) : TimeSpan.Zero),
                            Price = item.Price
                        };
                    })
                    .ToList()
            };
        }
        public async Task<BookingResponse> GetBookingByIdAsync(long bookingId, long userId)
        {
            // Implementation for retrieving a booking by ID
            throw new NotImplementedException();
        }
        public async Task<List<BookingResponse>> GetBookingsByUserIdAsync(long userId)
        {
            // Implementation for retrieving bookings by user ID
            throw new NotImplementedException();
        }
        public async Task<List<BookingResponse>> GetAllBookingsAsync()
        {
            // Implementation for retrieving all bookings
            throw new NotImplementedException();
        }
        public async Task<BookingResponse> UpdateBookingStatusAsync(long bookingId, string status)
        {
            // Implementation for updating booking status
            throw new NotImplementedException();
        }
        public async Task<BookingResponse> CancelBookingAsync(long bookingId, long userId)
        {
            // Implementation for canceling a booking
            throw new NotImplementedException();
        }
       
        


    }
}
