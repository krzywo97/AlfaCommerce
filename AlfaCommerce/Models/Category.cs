using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace AlfaCommerce.Models
{
    public partial class Category
    {
        public Category()
        {
            InverseParent = new HashSet<Category>();
            ProductsInCategory = new HashSet<ProductCategory>();
        }

        public int Id { get; set; }
        public int? ParentId { get; set; }
        
        [Required]
        public string Name { get; set; }

        public virtual Category Parent { get; set; }
        public virtual ICollection<Category> InverseParent { get; set; }
        [ForeignKey("ProductCategories")]
        public virtual ICollection<ProductCategory> ProductsInCategory { get; set; }
    }
}
