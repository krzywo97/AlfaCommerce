using System;
using System.Collections.Generic;

#nullable disable

namespace AlfaCommerce.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductCategories = new HashSet<ProductCategory>();
            ProductPhotos = new HashSet<ProductPhoto>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int ColorId { get; set; }
        public int Weight { get; set; }

        public virtual Color Color { get; set; }
        public virtual ICollection<ProductCategory> ProductCategories { get; set; }
        public virtual ICollection<ProductPhoto> ProductPhotos { get; set; }
    }
}
