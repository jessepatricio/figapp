using figAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace figAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}
        //set Contact DB
        public DbSet<Contact> Contacts { get; set; }
    }
}