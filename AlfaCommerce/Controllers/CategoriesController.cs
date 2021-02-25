using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using AlfaCommerce.Data;
using AlfaCommerce.Models;
using AlfaCommerce.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlfaCommerce.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class CategoriesController : Controller
    {
        private readonly StoreContext _context;

        public CategoriesController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryTreeDto>> Index()
        {
            var categories = await _context.Categories
                .Include(c => c.InverseParent)
                .Where(c => c.ParentId == null)
                .ToListAsync();

            return categories.Select(c => FillCategoryTree(c).Result);
        }

        [HttpGet("{id}")]
        public async Task<CategoryWithProductsDto> Details(int id)
        {
            var category = await _context.Categories
                .AsNoTracking()
                .Include(c => c.ProductsInCategory)
                .ThenInclude(pc => pc.Product)
                .ThenInclude(p => p.Color)
                .Include(c => c.ProductsInCategory)
                .ThenInclude(pc => pc.Product)
                .ThenInclude(p => p.ProductPhotos)
                .FirstOrDefaultAsync(c => c.Id == id);

            var products = new List<ProductDto>();
            foreach (var p in category.ProductsInCategory)
            {
                var color = new ColorDto()
                {
                    Id = p.Product.Color.Id,
                    Name = p.Product.Color.Name
                };

                var photos = new List<ProductPhotoDto>();
                foreach (var photo in p.Product.ProductPhotos)
                {
                    photos.Add(new ProductPhotoDto()
                    {
                        Url = photo.Url
                    });
                }
                
                var categories = new List<CategoryDto>();
                foreach (var productCategory in p.Product.ProductCategories)
                {
                    categories.Add(new CategoryDto()
                    {
                        Id = productCategory.Category.Id,
                        Name = productCategory.Category.Name
                    });
                }
                
                products.Add(new ProductDto()
                {
                    Id = p.Product.Id,
                    Name = p.Product.Name,
                    Price = p.Product.Price,
                    Weight = p.Product.Weight,
                    Color = color,
                    Photos = photos,
                    Categories = categories
                });
            }

            return new CategoryWithProductsDto()
            {
                Id = category.Id,
                Name = category.Name,
                Products = products
            };
        }

        [HttpPost]
        public async Task<IActionResult> Store(
            [Bind("parent_id,name")] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _context.AddAsync(category);
                await _context.SaveChangesAsync();
            }
            catch (DbException)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Category category)
        {
            try
            {
                _context.Update(category);
                await _context.SaveChangesAsync();
            }
            catch (DbException)
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
                var category = await _context.Categories
                    .AsNoTracking()
                    .FirstOrDefaultAsync(c => c.Id == id);

                _context.Remove(category);
                await _context.SaveChangesAsync();
            }
            catch (DbException)
            {
                return BadRequest();
            }

            return Ok();
        }

        //TODO: rewrite the function in a non-recursive way using stack
        private async Task<CategoryTreeDto> FillCategoryTree(Category category)
        {
            List<CategoryTreeDto> children = new List<CategoryTreeDto>();
            await _context.Entry(category).Collection(c => c.InverseParent).LoadAsync();
            foreach (var subcategory in category.InverseParent)
            {
                children.Add(FillCategoryTree(subcategory).Result);
            }

            return new CategoryTreeDto()
            {
                Id = category.Id,
                Name = category.Name,
                Children = children
            };
        }
    }
}