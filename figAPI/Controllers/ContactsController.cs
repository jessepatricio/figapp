using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using figAPI.Data;
using figAPI.Dtos;
using figAPI.Helpers;
using figAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace figAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository _repo;
        private readonly IMapper _mapper;
        
        // initialize and inject data context
        public ContactsController(IContactRepository repo, IMapper mapper)
        {
            //initial database context
            _mapper = mapper;
            _repo = repo;
        }
        // GET api/contacts
        [HttpGet]
        public async Task<IActionResult> GetContacts([FromQuery]QueryParams queryParams)
        {
            
            var contacts = await _repo.GetContacts(queryParams);
            
            var contactsToReturn = _mapper.Map<IEnumerable<ContactForListDto>>(contacts);

    
            Response.AddPagination(contacts.CurrentPage, contacts.PageSize,
         contacts.TotalCount, contacts.TotalPages);

            return Ok(contactsToReturn);
        }
       
        // GET api/contacts/5
        [HttpGet("{id}", Name="GetContact")]
        public async Task<IActionResult> GetContacts(int id)
        {
            var contact = await _repo.GetContact(id);
            var contactToReturn = _mapper.Map<ContactForDetailedDto>(contact);
            return Ok(contact);
        }

        
    }
}
