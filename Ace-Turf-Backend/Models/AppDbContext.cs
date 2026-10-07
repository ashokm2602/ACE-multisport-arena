using Microsoft.EntityFrameworkCore;

namespace Ace_Turf_Backend.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Booking> Bookings { get; set; }
    public DbSet<BookingItem> BookingItems { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<TurfSlot> TurfSlots { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure relationships and constraints if needed
        modelBuilder.Entity<Booking>()
            .HasMany(b => b.BookingItems)
            .WithOne(bi => bi.Booking)
            .HasForeignKey(bi => bi.BookingId);

        modelBuilder.Entity<Booking>()
            .HasMany(b => b.Payments)
            .WithOne(p => p.Booking)
            .HasForeignKey(p => p.BookingId);

        modelBuilder.Entity<TurfSlot>()
            .HasMany(ts => ts.BookingItems)
            .WithOne(bi => bi.TurfSlot)
            .HasForeignKey(bi => bi.TurfSlotId);
    }
}