using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using AlfaCommerce.Data;
using AlfaCommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlfaCommerce.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ColorsController : Controller
    {
        private readonly StoreContext _context;

        public ColorsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Color>> Index()
        {
            return await _context.Colors
                .AsNoTracking()
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Color> Details(int id)
        {
            return await _context.Colors
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);
        }
        
        [HttpPost]
        public async Task<IActionResult> Store(
            [Bind("name")] Color color)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _context.AddAsync(color);
                await _context.SaveChangesAsync();
            }
            catch (DbException)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Color color)
        {
            try
            {
                _context.Update(color);
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
                var color = await _context.Colors
                    .AsNoTracking()
                    .FirstOrDefaultAsync(c => c.Id == id);

                _context.Remove(color);
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