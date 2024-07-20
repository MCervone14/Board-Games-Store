export interface Product {
  id: number;
  name: string;
  price: number;
  salePrice: number;
  pictureUrl: string;
  publishers: { label: string; value: string }[];
  designers: { label: string; value: string }[];
  artists: { label: string; value: string }[];
  files: { name: string; preview: string; size: number; type: string }[];
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
  isFeatured: boolean;
  mechanics: { label: string; value: string }[];
  mechanicWeights: { label: string; value: string }[];
  categories: { label: string; value: string }[];
  categoryWeights: { label: string; value: string }[];
  quantityInStock: number;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types?: string[];
  pageNumber: number;
  pageSize: number;
}
