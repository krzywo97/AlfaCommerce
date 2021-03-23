using System;
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
    public class ColorsController : Controller
    {
        private readonly StoreContext _context;

        public ColorsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<ColorDto>> Index()
        {
            var colors = await _context.Colors
                .AsNoTracking()
                .OrderBy(c => c.Id)
                .ToListAsync();

            return colors.Select(c => new ColorDto()
            {
                Id = c.Id,
                Name = c.Name
            });
        }

        [HttpGet("{id}")]
        public async Task<ColorDto> Details(int id)
        {
            var color = await _context.Colors
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            return new ColorDto()
            {
                Id = color.Id,
                Name = color.Name
            };
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
            catch (Exception)
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
                var color = await _context.Colors
                    .AsNoTracking()
                    .FirstOrDefaultAsync(c => c.Id == id);

                _context.Remove(color);
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