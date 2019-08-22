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

            var checkdata = _context.Contacts.ToList();
                        
            if (checkdata.Count == 0) {
                //read file
                var contactData = System.IO.File.ReadAllText("Data/Contacts.json");
                //deserialize data
                var contacts = JsonConvert.DeserializeObject<List<Contact>>(contactData);

                foreach (var contact in contacts) {
                    _context.Contacts.Add(contact);
                }

                _context.SaveChanges();
            }

        }
    }
}