using System.Threading.Tasks;
using figAPI.Helpers;
using figAPI.Models;

namespace figAPI.Data
{
    public interface IContactRepository
    {
         Task<Contact> GetContact(int id);

         Task<PagedList<Contact>> GetContacts(QueryParams queryParams);
    }
}