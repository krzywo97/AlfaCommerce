using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using AlfaCommerce.Data;
using AlfaCommerce.Models;
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
        public async Task<IEnumerable<Product>> Index()
        {
            return await _context.Products
                .AsNoTracking()
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Product> Details(int id)
        {
            return await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id);
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

                /*foreach (string i in data.Images)
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
                }*/

                await _context.SaveChangesAsync();
            }
            catch (DbException)
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
            catch (DbException)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var product = _context.Products
                    .FirstOrDefaultAsync(p => p.Id == id);

                _context.Remove(product);
                await _context.SaveChangesAsync();
            }
            catch (DbException)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}