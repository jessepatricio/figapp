using AutoMapper;
using figAPI.Controllers;
using figAPI.Models;
using figAPI.Dtos;
using System.Linq;

namespace figAPI.Helpers
{
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles() {
            CreateMap<Contact, ContactForListDto>();
        }
    }
}