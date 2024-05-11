using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);
            
            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

         public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if(string.IsNullOrWhiteSpace(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        
        }

        
         public static IQueryable<Product> Filter(this IQueryable<Product> query, string types)
        {;
            var typesList = new List<string>();

             if (!string.IsNullOrEmpty(types))
            {
                typesList.AddRange(types.ToLower().Split(",").Select(t => t.Trim()).ToList());
            }

            query = query.Where(p => typesList.Count == 0 || typesList.Contains(p.Type.ToLower()));


            return query;
        }
    }
}