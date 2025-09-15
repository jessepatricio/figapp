using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace figAPI.Helpers
{
    public static class Extensions
    {
         public static void AddPagination(this HttpResponse response, 
            int currentPage, int itemsPerPage, int totalItems, int totalPages)
            {
                var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
                var camelCaseFormatter = new JsonSerializerSettings();
                camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
                response.Headers.Append("X-Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
                response.Headers.Append("Access-Control-Expose-Headers", "X-Pagination");
            }
    }
}