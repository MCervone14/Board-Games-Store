export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type?: string;
  designer: string;
  publisher: string;
  quantityInStock?: number;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types?: string[];
  pageNumber: number;
  pageSize: number;
}
