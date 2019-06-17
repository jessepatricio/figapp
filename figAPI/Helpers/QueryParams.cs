namespace figAPI.Helpers
{
    public class QueryParams
    {
        private const int MaxPageSize = 10;

        public int PageNumber { get; set; }
        public int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; } 
        }
       
    }
}