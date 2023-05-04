import { CartProduct } from '@/domain/models';
import { ShippingAddress } from '@/domain/models';
import React from 'react';

interface ContextProps {
  isLoaded: boolean;
  cart: CartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;

  // Methods
  addProductToCart: (product: CartProduct) => void;
  updateCartQuantity: (product: CartProduct) => void;
  removeCartProduct: (product: CartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;

  // Orders
  createOrder: () => Promise<{ hasError: boolean; message: string; }>;
}

export const CartContext = React.createContext<ContextProps>({} as ContextProps);

export const useCartContext = () => React.useContext(CartContext);