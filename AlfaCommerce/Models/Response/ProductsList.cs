using System.Collections.Generic;
using AlfaCommerce.Models.DTO;

namespace AlfaCommerce.Models.Response
{
    public class ProductsList
    {
        public int TotalPages { get; set; }
        public int TotalProducts { get; set; }
        public IEnumerable<ProductDto> Products { get; set; }
    }
}