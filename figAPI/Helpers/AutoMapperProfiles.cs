using AutoMapper;
using figAPI.Models;
using figAPI.Dtos;

namespace figAPI.Helpers
{
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles() {
            //create mapper for contact list
            CreateMap<Contact, ContactForListDto>();
        }
    }
}