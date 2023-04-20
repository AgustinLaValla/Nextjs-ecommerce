export interface Product {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: 'men' | 'women' | 'kid' | 'unisex'

  // TODO: agregar createdAt y updatedAt
  createdAt: string;
  updatedAt: string;

}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';

export type BaseProduct = Omit<Product, '_id' | 'createdAt' | 'updatedAt'>