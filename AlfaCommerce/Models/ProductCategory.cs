using System;
using System.Collections.Generic;

#nullable disable

namespace AlfaCommerce.Models
{
    public partial class ProductCategory
    {
        public int ProductId { get; set; }
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Product Product { get; set; }
        
        
    }
}
