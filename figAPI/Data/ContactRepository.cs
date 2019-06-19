
using System.Linq;
using System.Threading.Tasks;
using figAPI.Helpers;
using figAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace figAPI.Data
{
    public class ContactRepository : IContactRepository
    {

        public readonly DataContext _context;

        public ContactRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Contact> GetContact(int id)
        {
            //get contacts data by id
            var contact =   await _context.Contacts.FirstOrDefaultAsync(p => p.Id == id);

            return contact;
        }

        public async Task<PagedList<Contact>> GetContacts([FromQuery] QueryParams queryParams)
        {
            //get contacts data
            var contacts =  _context.Contacts.AsQueryable();

            //debug test params
            //var test = JsonConvert.SerializeObject(queryParams, Formatting.Indented);
            //Console.WriteLine("Params: "  + test);

            //add filter if not null
            if (queryParams.searchText != null) {
                
                contacts = contacts.Where(u => u.first_name.Contains(queryParams.searchText) 
                        || u.last_name.Contains(queryParams.searchText)
                        || u.email.Contains(queryParams.searchText)
                        || u.phone1.Contains(queryParams.searchText));
                
            }

            return  await PagedList<Contact>.CreateAsync(contacts, queryParams.PageNumber, queryParams.PageSize);
        }

    }
}