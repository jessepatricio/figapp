using AutoMapper;
using figAPI.Data;
using figAPI.Dtos;
using figAPI.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace figAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

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
        public async Task<IActionResult> GetContacts([FromQuery] QueryParams queryParams = null)
        {
            // Provide defaults if queryParams is null
            queryParams ??= new QueryParams();
            //get contacts table
            var contacts = await _repo.GetContacts(queryParams);
            //map to contact list display format
            var contactsToReturn = _mapper.Map<IEnumerable<ContactForListDto>>(contacts);
            //add pagination to header    
            Response.AddPagination(contacts.CurrentPage, contacts.PageSize,
            contacts.TotalCount, contacts.TotalPages);

            return Ok(contactsToReturn);
        }

        // GET api/contacts/5
        [HttpGet("{id}", Name = "GetContact")]
        public async Task<IActionResult> GetContacts(int id)
        {
            var contact = await _repo.GetContact(id);
            var contactToReturn = _mapper.Map<ContactForDetailedDto>(contact);
            return Ok(contact);
        }


    }
}
