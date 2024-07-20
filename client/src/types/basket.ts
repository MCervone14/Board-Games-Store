export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
  paymentIntentId?: string;
  clientSecret?: string;
}

export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  salePrice: number;
  pictureUrl: string;
  publishers: string[];
  designers: string[];
  artists: string[];
  playerCount: string;
  playingTime: string;
  playerAge: string;
  year: string;
  condition: string;
  isUsed: boolean;
  complexity: string;
  hasFreeShipping: boolean;
  description: string;
  longDescription: string;
  mechanics: string[];
  categories: string[];
  quantityInStock: number;
}
