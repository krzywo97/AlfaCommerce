using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using AlfaCommerce.Data;
using AlfaCommerce.Models;
using AlfaCommerce.Models.DTO;
using AlfaCommerce.Models.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlfaCommerce.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ProductsController : Controller
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductDto>> Index()
        {
            var products = await _context.Products
                .AsNoTracking()
                .Include(p => p.Color)
                .Include(p => p.ProductCategories)
                .ThenInclude(pc => pc.Category)
                .Include(p => p.ProductPhotos)
                .AsSplitQuery()
                .ToListAsync();

            return products.Select(p =>
            {
                var color = new ColorDto()
                {
                    Id = p.Color.Id,
                    Name = p.Color.Name
                };

                var categories = new List<CategoryDto>();
                foreach (var c in p.ProductCategories)
                {
                    CategoryDto category = new CategoryDto()
                    {
                        Id = c.Category.Id,
                        Name = c.Category.Name
                    };
                    categories.Add(category);
                }

                var photos = new List<ProductPhotoDto>();
                foreach (var photo in p.ProductPhotos)
                {
                    ProductPhotoDto photoDto = new ProductPhotoDto()
                    {
                        Url = photo.Url
                    };
                    photos.Add(photoDto);
                }

                return new ProductDto()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Weight = p.Weight,
                    Color = color,
                    Categories = categories,
                    Photos = photos
                };
            });
        }

        [HttpGet("{id}")]
        public async Task<ProductDto> Details(int id)
        {
            var product = await _context.Products
                .AsNoTracking()
                .Include(p => p.Color)
                .Include(p => p.ProductCategories)
                .ThenInclude(pc => pc.Category)
                .Include(p => p.ProductPhotos)
                .AsSplitQuery()
                .FirstOrDefaultAsync(p => p.Id == id);

            var color = new ColorDto()
            {
                Id = product.Color.Id,
                Name = product.Color.Name
            };

            var categories = new List<CategoryDto>();
            foreach (var c in product.ProductCategories)
            {
                CategoryDto categoryDto = new CategoryDto()
                {
                    Id = c.Category.Id,
                    Name = c.Category.Name
                };
                categories.Add(categoryDto);
            }

            var photos = new List<ProductPhotoDto>();
            foreach (var p in product.ProductPhotos)
            {
                ProductPhotoDto photoDto = new ProductPhotoDto()
                {
                    Url = p.Url
                };
                photos.Add(photoDto);
            }

            return new ProductDto()
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Weight = product.Weight,
                Color = color,
                Categories = categories,
                Photos = photos
            };
        }

        [HttpPost]
        public async Task<IActionResult> Store(
            [FromBody] StoreProduct data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _context.AddAsync(data.Product);

                foreach (string i in data.Photos)
                {
                    ProductPhoto photo = new ProductPhoto
                    {
                        Product = data.Product,
                        Url = i
                    };
                    await _context.AddAsync(photo);
                }

                foreach (int c in data.Categories)
                {
                    ProductCategory productCategory = new ProductCategory
                    {
                        CategoryId = c,
                        Product = data.Product
                    };
                    await _context.AddAsync(productCategory);
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Edit(
            [Bind("name,price,color,weight")] Product product)
        {
            try
            {
                _context.Update(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var product = await _context.Products
                    .Include(p => p.ProductPhotos)
                    .FirstOrDefaultAsync(p => p.Id == id);

                foreach (var photo in product.ProductPhotos)
                {
                    _context.Remove(photo);
                }

                _context.Remove(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}