using System.Collections.Generic;

namespace AlfaCommerce.Models.DTO
{
    public class CategoryWithProductsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ProductDto> Products { get; set; }
    }
}