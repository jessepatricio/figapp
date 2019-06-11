namespace figAPI.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string first_name  { get; set; }
        public string last_name { get; set; }
        public string company_name { get; set; } 

        public string address { get; set; }
        public string city { get; set; }
        public string post { get; set; }
        public string phone1 { get; set; }
        public string phone2  { get; set; }
        public string email { get; set; }
        public string web { get; set; }

    }
}