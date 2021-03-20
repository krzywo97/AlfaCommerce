using System.Collections.Generic;

namespace AlfaCommerce.Models.DTO
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public ColorDto Color { get; set; }
        public int Weight { get; set; }
        public ICollection<ProductPhotoDto> Photos { get; set; }
        public ICollection<CategoryDto> Categories { get; set; }
    }
}