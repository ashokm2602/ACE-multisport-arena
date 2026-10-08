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

        Task<List<TurfSlot>> ITurfSlotServicecs.GetTurfSlotsByDateAsync(DateTime date)
        {
            throw new NotImplementedException();
        }
    }


public static class TurfSlotEndpoints
{
	public static void MapTurfSlotEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/TurfSlot").WithTags(nameof(TurfSlot));

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.TurfSlots.ToListAsync();
        })
        .WithName("GetAllTurfSlots")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<TurfSlot>, NotFound>> (long id, AppDbContext db) =>
        {
            return await db.TurfSlots.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is TurfSlot model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetTurfSlotById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (long id, TurfSlot turfSlot, AppDbContext db) =>
        {
            var affected = await db.TurfSlots
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.Id, turfSlot.Id)
                  .SetProperty(m => m.SlotDate, turfSlot.SlotDate)
                  .SetProperty(m => m.StartTime, turfSlot.StartTime)
                  .SetProperty(m => m.EndTime, turfSlot.EndTime)
                  .SetProperty(m => m.Price, turfSlot.Price)
                  .SetProperty(m => m.IsAvailable, turfSlot.IsAvailable)
                  .SetProperty(m => m.CreatedAt, turfSlot.CreatedAt)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateTurfSlot")
        .WithOpenApi();

        group.MapPost("/", async (TurfSlot turfSlot, AppDbContext db) =>
        {
            db.TurfSlots.Add(turfSlot);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/TurfSlot/{turfSlot.Id}",turfSlot);
        })
        .WithName("CreateTurfSlot")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (long id, AppDbContext db) =>
        {
            var affected = await db.TurfSlots
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteTurfSlot")
        .WithOpenApi();
    }
}}