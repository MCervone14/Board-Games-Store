
using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context) 
        {
            if (context.Products.Any()) return;

            var products = new List<Product> 
            {
                new Product 
                {
                    Name = "Brass: Birmingham",
                    Description = "Build networks, grow industries, and navigate the world of the Industrial Revolution.",
                    Price = 7999,
                    PictureUrl = "/images/products/BrassBirmingham.jpg",
                    Type = "Strategy",
                    Designer = "Gavan Brown, Matt Tolman, Martin Wallace",
                    Publisher = "Roxley Games",
                    QuantityInStock = 10
                },
                new Product 
                {
                    Name = "Gloomhaven",
                    Description = "Vanquish monsters with strategic cardplay. Fulfill your quest to leave your legacy!",
                    Price = 20000,
                    PictureUrl = "/images/products/Gloomhaven.jpg",
                    Type = "Strategy, Thematic",
                    Designer = "Isaac Childres",
                    Publisher = "Cephalofair Games",
                    QuantityInStock = 5
                },
                new Product 
                {
                    Name = "Pandemic Legacy: Season 1",
                    Description = "Mutating diseases are spreading around the world - can your team save humanity?",
                    Price = 8999,
                    PictureUrl = "/images/products/PandemicLegacySeason1.jpg",
                    Type = "Strategy, Thematic",
                    Designer = "Rob Daviau, Matt Leacock",
                    Publisher = "Z-Man Games",
                    QuantityInStock = 15
                },
                new Product 
                {
                    Name = "Scythe",
                    Description = "Five factions vie for dominance in a war-torn, mech-filled, dieselpunk 1920s Europe.",
                    Price = 9900,
                    PictureUrl = "/images/products/Scythe.jpg",
                    Type = "Strategy",
                    Designer = "Jamey Stegmaier",
                    Publisher = "Stonemaier Games",
                    QuantityInStock = 20
                },
                new Product 
                {
                    Name = "Terraforming Mars",
                    Description = "Compete with rival CEOs to make Mars habitable and profitable for your corporation.",
                    Price = 6999,
                    PictureUrl = "/images/products/TerraformingMars.jpg",
                    Type = "Strategy",
                    Designer = "Jacob Fryxelius",
                    Publisher = "FryxGames",
                    QuantityInStock = 25
                },
                new Product 
                {
                    Name = "Arkham Horror: The Card Game",
                    Description = "Investigate the horrors of Arkham while courting cosmic doom.",
                    Price = 2199,
                    PictureUrl = "/images/products/ArkhamHorror.jpg",
                    Type = "Card Game, Thematic",
                    Designer = "Nate French, Matthew Newman",
                    Publisher = "Fantasy Flight Games",
                    QuantityInStock = 30
                },
                new Product 
                {
                    Name = "Root",
                    Description = "Choose your faction and fight for control of the forest in this asymmetric strategy game.",
                    Price = 5999,
                    PictureUrl = "/images/products/Root.jpg",
                    Type = "Strategy",
                    Designer = "Cole Wehrle",
                    Publisher = "Leder Games",
                    QuantityInStock = 35
                },
                new Product 
                {
                    Name = "Wingspan",
                    Description = "Attract a beautiful and diverse collection of birds to your wildlife preserve.",
                    Price = 5999,
                    PictureUrl = "/images/products/Wingspan.jpg",
                    Type = "Strategy",
                    Designer = "Elizabeth Hargrave",
                    Publisher = "Stonemaier Games",
                    QuantityInStock = 40
                },
                new Product 
                {
                    Name = "Twilight Imperium: Fourth Edition",
                    Description = "Lead one of seventeen factions in a grand strategy game of galactic conquest.",
                    Price = 11999,
                    PictureUrl = "/images/products/TwilightImperium.jpg",
                    Type = "Strategy, Thematic",
                    Designer = "Dane Beltrami, Corey Konieczka, Christian T. Petersen",
                    Publisher = "Fantasy Flight Games",
                    QuantityInStock = 45
                },
                new Product 
                {
                    Name = "Spirit Island",
                    Description = "Defend your island from colonizing Invaders with the help of powerful Spirits.",
                    Price = 7999,
                    PictureUrl = "/images/products/SpiritIsland.jpg",
                    Type = "Strategy, Thematic",
                    Designer = "R. Eric Reuss",
                    Publisher = "Greater Than Games",
                    QuantityInStock = 50
                },
                new Product {
                    Name = "The Crew: The Quest for Planet Nine",
                    Description = "Work together to complete missions and find the mysterious Planet Nine.",
                    Price = 1499,
                    PictureUrl = "/images/products/TheCrew.jpg",
                    Type = "Card Game",
                    Designer = "Thomas Sing",
                    Publisher = "KOSMOS",
                    QuantityInStock = 55
                },
                new Product {
                    Name = "7 Wonders Duel",
                    Description = "Draft cards and build your civilization in this two-player version of the classic game.",
                    Price = 2499,
                    PictureUrl = "/images/products/7WondersDuel.jpg",
                    Type = "Strategy",
                    Designer = "Antoine Bauza, Bruno Cathala",
                    Publisher = "Repos Production",
                    QuantityInStock = 60
                },
                new Product {
                    Name = "Azul",
                    Description = "Decorate the walls of the Royal Palace of Evora with beautiful tiles.",
                    Price = 3999,
                    PictureUrl = "/images/products/Azul.jpg",
                    Type = "Abstract, Family",
                    Designer = "Michael Kiesling",
                    Publisher = "Plan B Games",
                    QuantityInStock = 65
                },
                new Product {
                    Name = "Codenames",
                    Description = "Give your team clever one-word clues to help them identify their agents in the field.",
                    Price = 1999,
                    PictureUrl = "/images/products/Codenames.jpg",
                    Type = "Party, Word",
                    Designer = "Vlaada Chvátil",
                    Publisher = "Czech Games Edition",
                    QuantityInStock = 70
                },
                new Product {
                    Name = "Kingdomino",
                    Description = "Build a 5x5 kingdom with domino-like tiles in this Spiel des Jahres winner.",
                    Price = 1999,
                    PictureUrl = "/images/products/Kingdomino.jpg",
                    Type = "Family",
                    Designer = "Bruno Cathala",
                    Publisher = "Blue Orange Games",
                    QuantityInStock = 75
                },
                new Product {
                    Name = "Kingdom Death: Monster",
                    Description = "Survive in a nightmarish world filled with monsters and darkness.",
                    Price = 40000,
                    PictureUrl = "/images/products/KingdomDeathMonster.jpg",
                    Type = "Thematic",
                    Designer = "Adam Poots",
                    Publisher = "Kingdom Death",
                    QuantityInStock = 1
                },
                new Product {
                    Name = "Ticket to Ride",
                    Description = "Collect train cards and claim railway routes across the country in this classic game.",
                    Price = 4499,
                    PictureUrl = "/images/products/TicketToRide.jpg",
                    Type = "Family",
                    Designer = "Alan R. Moon, Matt Leacock, Rob Daviau",
                    Publisher = "Days of Wonder",
                    QuantityInStock = 0
                }
            };

            context.Products.AddRange(products);

            context.SaveChanges();
        }
    }
}