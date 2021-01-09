using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using AlfaCommerce.Data.Migrations;
using AlfaCommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlfaCommerce.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : Controller
    {
        private readonly StoreContext _context;

        public CategoriesController(StoreContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IEnumerable<Category>> Index()
        {
            return await _context.Categories
                .AsNoTracking()
                //.Include(c => c.ProductCategories)
                //.ThenInclude(p => p.Product)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Category> Details(int id)
        {
            return await _context.Categories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        [HttpPost]
        public async Task<IActionResult> Store(
            [Bind("parent_id,name")] Category category)
        {
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

        [HttpPut("{id}")]
        public async void Edit(int id, Category category)
        {
            _context.Update(category);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("id")]
        public async void Delete(int id)
        {
            var category = await _context.Categories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            _context.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}