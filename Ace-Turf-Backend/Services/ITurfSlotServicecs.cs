using Ace_Turf_Backend.Models;

namespace Ace_Turf_Backend.Services
{
    public interface ITurfSlotServicecs
    {
        public Task<List<TurfSlot>> GetAllTurfSlotsAsync();
        public Task<TurfSlot> GetTurfSlotByIdAsync(long id);
        public Task<TurfSlot> CreateTurfSlotAsync(DateTime date);
        public Task DeleteTurfSlotAsync(long id);
        public Task<TurfSlot> UpdateTurfSlotAsync(long id, TurfSlot turfSlot);
        public Task<List<TurfSlot>> GetAvailableTurfSlotsAsync(DateTime date);
        public Task<List<TurfSlot>> GetTurfSlotsByDateAsync(DateTime date);
    }
}
