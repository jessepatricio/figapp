namespace figAPI.Helpers
{
    public class QueryParams
    {
        public string? searchText { get; set; } = string.Empty;
        public int PageNumber { get; set; } = 1;
        private const int MaxPageSize = 20;
        
        public int _pageSize = 10;
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = (value > MaxPageSize) ? MaxPageSize : value; } 
        }

        
       
    }
}