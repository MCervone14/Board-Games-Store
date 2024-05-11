
using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            

            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Types)
                .AsQueryable();


            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            
            var paginationMetaData = products.MetaData;

            var response = new {
                products,
                paginationMetaData
            };

             var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

             Response.Headers.Append("Pagination", JsonSerializer.Serialize(products.MetaData, options));
             Response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product =  await _context.Products.FindAsync(id);

            if(product == null) return null;

            return product;
        }

        [HttpGet("filters")]

        public async Task<IActionResult> GetFilters()
        {
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();


            return Ok(new {types});
        }
    }
}