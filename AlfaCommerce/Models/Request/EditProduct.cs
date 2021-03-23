using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AlfaCommerce.Models.Request
{
    public class EditProduct
    {
        [Required] public int Id { get; set; }
        [Required] public string Name { get; set; }
        [Required] public int ColorId { get; set; }
        [Required] public int Weight { get; set; }
        [Required] public float Price { get; set; }
        [Required] public List<int> Categories { get; set; }
        [Required] public List<string> Photos { get; set; }
    }
}