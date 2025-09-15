using System;
using System.Collections.Generic;
using System.Linq;
using figAPI.Models;
using Newtonsoft.Json;

namespace figAPI.Data
{
    public class Seeder
    {
        private readonly DataContext _context;

        public Seeder(DataContext context)
        {
            //init database context
            _context = context;
        }

        public void SeedContacts() {


            try
            {
                Console.WriteLine("🌱 Starting to seed contacts...");

                // Ensure database and tables exist FIRST
                _context.Database.EnsureCreated();
                Console.WriteLine("✅ Database and tables created/verified");

                 // Check if data already exists
                var existingCount = _context.Contacts.Count();
                Console.WriteLine($"📊 Found {existingCount} existing contacts");

                if (existingCount > 0)
                {
                    Console.WriteLine("⏭️ Skipping seeding - data already exists");
                    return;
                }

                // Try multiple possible file paths
                string[] possiblePaths = {
                    "Data/Contacts.json",
                    "./Data/Contacts.json",
                    "../Data/Contacts.json",
                    Path.Combine(Directory.GetCurrentDirectory(), "Data", "Contacts.json"),
                    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "Contacts.json")
                };

                string contactData = null;
                string usedPath = null;

                foreach (var path in possiblePaths)
                {
                    Console.WriteLine($"🔍 Trying path: {Path.GetFullPath(path)}");
                    
                    if (File.Exists(path))
                    {
                        contactData = File.ReadAllText(path);
                        usedPath = path;
                        Console.WriteLine($"✅ Found file at: {Path.GetFullPath(path)}");
                        break;
                    }
                }

                if (contactData == null)
                {
                    Console.WriteLine("❌ Contacts.json file not found in any of the expected locations:");
                    foreach (var path in possiblePaths)
                    {
                        Console.WriteLine($"   - {Path.GetFullPath(path)}");
                    }
                    
                    // Create sample data instead
                    Console.WriteLine("🔧 Creating sample data instead...");
                    
                    return;
                }

                Console.WriteLine($"📄 File size: {contactData.Length} characters");

                

                  // Deserialize data
                var contacts = JsonConvert.DeserializeObject<List<Contact>>(contactData);

                if (contacts == null || contacts.Count == 0)
                {
                    Console.WriteLine("⚠️ No contacts found in JSON file or failed to deserialize");
                    //CreateSampleContacts();
                    return;
                }

                Console.WriteLine($"📦 Deserialized {contacts.Count} contacts from JSON");

                // Add contacts to database
                foreach (var contact in contacts)
                {
                    _context.Contacts.Add(contact);
                }

                var savedCount = _context.SaveChanges();
                Console.WriteLine($"🎉 Successfully seeded {savedCount} contacts!");


                //var checkdata = _context.Contacts.ToList();
                /* if (existingCount == 0)
                {
                    //read file
                    var contactData = System.IO.File.ReadAllText("Data/Contacts.json");
                    //deserialize data
                    var contacts = JsonConvert.DeserializeObject<List<Contact>>(contactData);

                    foreach (var contact in contacts)
                    {
                        _context.Contacts.Add(contact);
                    }

                    _context.SaveChanges();

                } */
            } catch (Exception ex)
            {
                Console.WriteLine($"❌ Error in SeedContacts: {ex.Message}");
                Console.WriteLine($"📍 Stack trace: {ex.StackTrace}");
                
                // Try creating sample data as fallback
                try
                {
                    Console.WriteLine("🔧 Attempting to create sample data as fallback...");
                    
                }
                catch (Exception fallbackEx)
                {
                    Console.WriteLine($"❌ Fallback also failed: {fallbackEx.Message}");
                }
            }

        }
    }
}