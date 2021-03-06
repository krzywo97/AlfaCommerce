﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AlfaCommerce.Models
{
    public partial class ProductPhoto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Url { get; set; }

        public virtual Product Product { get; set; }
    }
}
