using Microsoft.EntityFrameworkCore;
using Ace_Turf_Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;

namespace Ace_Turf_Backend.Services
{
    public class TurfSlotService : ITurfSlotServicecs
    {
        private readonly AppDbContext _context;
        public TurfSlotService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<TurfSlot>> GetAllTurfSlotsAsync()
        {
            return await _context.TurfSlots.ToListAsync();
        }
        public async Task<TurfSlot> GetTurfSlotByIdAsync(long id)
        {
            return await _context.TurfSlots.FindAsync(id);
        }
        public async Task<TurfSlot> CreateTurfSlotAsync(DateTime date)
        {
            var turfSlot = new TurfSlot
            {
                SlotDate = date,
                StartTime = new TimeSpan(9, 0, 0), // Example start time
                EndTime = new TimeSpan(10, 0, 0), // Example end time
                Price = 100.00m, // Example price
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow
            };
            _context.TurfSlots.Add(turfSlot);
            await _context.SaveChangesAsync();
            return turfSlot;
        }
        public async Task DeleteTurfSlotAsync(long id)
        {
            var turfSlot = await _context.TurfSlots.FindAsync(id);
            if (turfSlot != null)
            {
                _context.TurfSlots.Remove(turfSlot);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<TurfSlot> UpdateTurfSlotAsync(long id, TurfSlot turfSlot)
        {
            var existingTurfSlot = await _context.TurfSlots.FindAsync(id);
            if (existingTurfSlot != null)
            {
                existingTurfSlot.SlotDate = turfSlot.SlotDate;
                existingTurfSlot.StartTime = turfSlot.StartTime;
                existingTurfSlot.EndTime = turfSlot.EndTime;
                existingTurfSlot.Price = turfSlot.Price;
                existingTurfSlot.IsAvailable = turfSlot.IsAvailable;
                await _context.SaveChangesAsync();
            }
            return existingTurfSlot;
        }
        public async Task<List<TurfSlot>> GetAvailableTurfSlotsAsync(DateTime date)
        {
            return await _context.TurfSlots
                                 .Where(ts => ts.SlotDate.Date == date.Date && ts.IsAvailable)
                                 .ToListAsync();
        }

        public async Task CreateTurfSlotsForDateAsync(DateTime date)
                {
                    var today = DateTime.Today;
                    var endDate = date.Date;

                    var existingSlots = await _context.TurfSlots
                        .Where(ts => ts.SlotDate >= today &&
                                     ts.SlotDate < endDate)
                        .Select(ts => new
                        {
                            SlotDate = ts.SlotDate.Date,
                            ts.StartTime,
                            ts.EndTime
                        })
                        .ToListAsync();

                    var existingSlotKeys = existingSlots
                        .Select(s => (s.SlotDate, s.StartTime, s.EndTime))
                        .ToHashSet();

                    var newSlots = new List<TurfSlot>();

                    for (var d = today; d < endDate; d = d.AddDays(1))
                    {
                        for (var hour = 0; hour < 24; hour++)
                        {
                            var startTime = TimeSpan.FromHours(hour);
                            var endTime = startTime.Add(TimeSpan.FromHours(1));

                            var key = (d, startTime, endTime);

                            if (existingSlotKeys.Contains(key))
                                continue;

                            newSlots.Add(new TurfSlot
                            {
                                SlotDate = d,
                                StartTime = startTime,
                                EndTime = endTime,
                                Price = 100.00m,
                                IsAvailable = true,
                                CreatedAt = DateTime.UtcNow
                            });
                        }
                    }

                    if (newSlots.Count > 0)
                    {
                        _context.TurfSlots.AddRange(newSlots);
                        await _context.SaveChangesAsync();
                    }
                }

        public async Task<List<TurfSlot>> GetTurfSlotsByDateAsync(DateTime date)
        {
               return await _context.TurfSlots
                                 .Where(ts => ts.SlotDate.Date == date.Date)
                                 .ToListAsync();
        }

        
    }

}


