using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AlfaCommerce.Models.Request
{
    public class StoreProduct
    {
        [Required]
        public Product Product { get; set; }
        [Required]
        public List<string> Images { get; set; }
        [Required]
        public List<int> Categories { get; set; }
    }
}