import { Size } from "./";

export interface CartProduct {
  _id: string;
  image: string;
  price: number;
  size?: Size;
  slug: string;
  title: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  quantity: number;
}