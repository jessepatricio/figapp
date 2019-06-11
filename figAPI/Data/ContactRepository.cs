using System;
using System.Collections.Generic;
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
        public Task<Contact> GetContact(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<Contact>> GetContacts([FromQuery] QueryParams queryParams)
        {
            
            var contacts =  _context.Contacts.AsQueryable();

            //add filter
            
            // contacts = contacts.Where(u => u.first_name == queryParams.first_name 
            //         || u.last_name == queryParams.last_name 
            //         || u.email == queryParams.email
            //         || u.phone1 == queryParams.phone1);

            //Console.Write(queryParams.last_name);
            return  await PagedList<Contact>.CreateAsync(contacts, queryParams.PageNumber, queryParams.PageSize);
        }

    }
}