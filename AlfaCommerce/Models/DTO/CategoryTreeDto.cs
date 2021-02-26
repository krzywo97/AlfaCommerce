using System.Collections.Generic;

namespace AlfaCommerce.Models.DTO
{
    public class CategoryTreeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<CategoryTreeDto> Children { get; set; }
    }
}