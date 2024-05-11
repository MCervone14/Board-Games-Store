using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }


        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);

        }
        
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails {
                Status = 400,
                Title = "Failed to add item to basket"
            }) ;
        }
        
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return null;
            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            
            if (result) {
                 return Ok(MapBasketToDto(basket));
            };

             return BadRequest(new ProblemDetails {
                Status = 400,
                Title = "Problem removing item from basket"
            }) ;
        }


        // Methods
         private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets.Include(i => i.Items).ThenInclude(p => p.Product).FirstOrDefaultAsync(x => x.BuyerId == HttpContext.Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket() 
        {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions 
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket 
            {
                BuyerId = buyerId
            };

            _context.Baskets.Add(basket);
            return basket;
        }

          private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(x => new BasketItemDto
                {
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Price = x.Product.Price,
                    PictureUrl = x.Product.PictureUrl,
                    Publisher = x.Product.Publisher,
                    Type = x.Product.Type,
                    Quantity = x.Quantity
                }).ToList()
            };
        }
    }
}