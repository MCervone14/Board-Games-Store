using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        
         public static IQueryable<Product> Filter(this IQueryable<Product> query, string publishers, string types)
        {
            var publishersList = new List<string>();
            var typesList = new List<string>();

            if (!string.IsNullOrEmpty(publishers))
            {
                publishersList.AddRange(publishers.ToLower().Split(",").ToList());
            }

             if (!string.IsNullOrEmpty(types))
            {
                typesList.AddRange(types.ToLower().Split(",").ToList());
            }

            query = query.Where(p => publishersList.Count == 0 || publishersList.Contains(p.Publisher.ToLower()));
            query = query.Where(p => typesList.Count == 0 || typesList.Contains(p.Type.ToLower()));


            return query;
        }
    }
}