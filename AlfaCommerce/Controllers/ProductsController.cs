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
        public async Task<ActionResult<IEnumerable<ProductDto>>> Index(
            [FromQuery(Name = "name")] string nameFilter,
            [FromQuery(Name = "category")] int? categoryFilter,
            [FromQuery(Name = "color")] int? colorFilter,
            [FromQuery(Name = "minPrice")] float? minPriceFilter,
            [FromQuery(Name = "maxPrice")] float? maxPriceFilter,
            [FromQuery(Name = "minWeight")] float? minWeightFilter,
            [FromQuery(Name = "maxWeight")] float? maxWeightFilter,
            [FromQuery(Name = "page")] int? page,
            [FromQuery(Name = "perPage")] int? perPage)
        {
            if ((!ModelState.IsValid)
                || (minPriceFilter > maxPriceFilter)
                || (minWeightFilter > maxWeightFilter))
            {
                return BadRequest();
            }

            var products = _context.Products
                .AsNoTracking()
                .Include(p => p.Color)
                .Include(p => p.ProductCategories)
                .ThenInclude(pc => pc.Category)
                .Include(p => p.ProductPhotos)
                .AsQueryable();

            if (!string.IsNullOrEmpty(nameFilter))
            {
                products = products.Where(p => p.Name.ToLower().Contains(nameFilter.ToLower()));
            }

            if (categoryFilter > 0)
            {
                products = products.Where(p =>
                    p.ProductCategories.Where(pc =>
                        pc.CategoryId == categoryFilter).ToList().Count > 0);
            }

            if (colorFilter > 0)
            {
                products = products.Where(p => p.ColorId == colorFilter);
            }

            if (minPriceFilter > 0)
            {
                products = products.Where(p => p.Price >= minPriceFilter);
            }

            if (maxPriceFilter > 0)
            {
                products = products.Where(p => p.Price <= maxPriceFilter);
            }

            if (minWeightFilter > 0)
            {
                products = products.Where(p => p.Weight >= minWeightFilter);
            }

            if (maxWeightFilter > 0)
            {
                products = products.Where(p => p.Weight <= maxWeightFilter);
            }

            if (perPage < 1 || perPage > 50)
            {
                perPage = 20;
            }

            if (page < 1)
            {
                page = 1;
            }

            var results = products
                .OrderBy(p => p.Id)
                .Take(perPage ?? 20)
                .Skip(((page - 1) * perPage) ?? 0)
                .AsSplitQuery()
                .ToListAsync()
                .Result;

            return Ok(results.Select(p =>
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
            }));
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