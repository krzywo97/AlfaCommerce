using System;
using System.Collections.Generic;

#nullable disable

namespace AlfaCommerce.Models
{
    public partial class Category
    {
        public Category()
        {
            InverseParent = new HashSet<Category>();
            ProductCategories = new HashSet<ProductCategory>();
        }

        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }

        public virtual Category Parent { get; set; }
        public virtual ICollection<Category> InverseParent { get; set; }
        public virtual ICollection<ProductCategory> ProductCategories { get; set; }
    }
}
