using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AlfaCommerce.Data;
using AlfaCommerce.Models;
using AlfaCommerce.Models.DTO;
using AlfaCommerce.Models.Request;
using AlfaCommerce.Models.Response;
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
        public async Task<ActionResult<ProductsList>> Index(
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

            // We need to get total products count right after filters are applied
            // And before applying pagination
            int totalProductsCount = await products
                .CountAsync();

            if (perPage == null || perPage < 1 || perPage > 60)
            {
                perPage = 40;
            }

            if (page < 1)
            {
                page = 1;
            }

            var results = products
                .OrderBy(p => p.Id)
                .Skip(((page - 1) * perPage) ?? 0)
                .Take((int) perPage)
                .AsSplitQuery()
                .ToListAsync()
                .Result.Select(p =>
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

            return Ok(new ProductsList()
            {
                Products = results,
                TotalProducts = totalProductsCount,
                TotalPages = (int) (Math.Ceiling(totalProductsCount / (double) perPage))
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
            [Bind("id,name,price,color,weight,categories,photos")]
            EditProduct product)
        {
            try
            {
                var trackedProduct = await _context
                    .Products
                    .Where(p => p.Id == product.Id)
                    .Include(p => p.ProductCategories)
                    .Include(p => p.ProductPhotos)
                    .FirstOrDefaultAsync();

                trackedProduct.Name = product.Name;
                trackedProduct.Price = product.Price;
                trackedProduct.Weight = product.Weight;
                trackedProduct.ColorId = product.ColorId;
                _context.Update(trackedProduct);

                foreach (var pc in trackedProduct.ProductCategories)
                {
                    _context.RemoveRange(_context
                        .ProductCategories
                        .Where(c => c.ProductId == product.Id && c.CategoryId == pc.CategoryId));
                }

                foreach (var p in trackedProduct.ProductPhotos)
                {
                    _context.RemoveRange(_context
                        .ProductPhotos
                        .Where(ph => ph.ProductId == product.Id));
                }

                //await _context.SaveChangesAsync();

                foreach (var c in product.Categories)
                {
                    await _context.ProductCategories
                        .AddAsync(new ProductCategory()
                        {
                            CategoryId = c,
                            ProductId = product.Id
                        });
                }

                foreach (var p in product.Photos)
                {
                    await _context.ProductPhotos.AddAsync(new ProductPhoto()
                    {
                        ProductId = product.Id,
                        Url = p,
                    });
                }

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