import React, { useReducer } from 'react'
import { CartProduct, Order, ShippingAddress } from '@/domain/models';
import { Cookie, http } from '@/infrastructure/adapters';
import { cartReducer } from './CartReducer';
import { CartContext } from './CartContext';
import { ordersClientService } from '@/domain/services/orders/orders.service';
import { ordersClientRepository } from '@/infrastructure/repositories';

export interface CartState {
  isLoaded: boolean;
  cart: CartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress,
}

const initialState: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const ordersService = ordersClientService(ordersClientRepository);

export const CartProvider: React.FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProductToCart = (product: CartProduct) => {

    const productInCart = state.cart.some(p => p._id === product._id);
    if (!productInCart) return dispatch({
      type: '[Cart] - Update products in cart',
      payload: [...state.cart, product]
    })

    const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
    if (!productInCartButDifferentSize) return dispatch({
      type: '[Cart] - Update products in cart',
      payload: [...state.cart, product]
    })

    // Acumulate
    const updatedProducts = state.cart.map(p => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Update quantity
      p.quantity += product.quantity;
      return p;
    });

    dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

  }

  const updateCartQuantity = (product: CartProduct) => {
    dispatch({ type: '[Cart] - Change cart quantity', payload: product });
  }

  const removeCartProduct = (product: CartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product });
  }

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set('firstName', address.firstName);
    Cookie.set('lastName', address.lastName);
    Cookie.set('address', address.address);
    Cookie.set('address2', address.address2 || '');
    Cookie.set('zip', address.zip);
    Cookie.set('city', address.city);
    Cookie.set('country', address.country);
    Cookie.set('phone', address.phone);

    dispatch({ type: '[Cart] - Update Address', payload: address });
  }

  const createOrder = async (): Promise<{ hasError: boolean; message: string; }> => {

    if (!state.shippingAddress) {
      throw new Error('No hay dirección de entrega');
    }

    const body: Order = {
      orderItems: state.cart.map(p => ({
        ...p,
        size: p.size!
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false
    }


    try {

      const data = await ordersService.createOrder(body)

      dispatch({ type: '[Cart] - Order complete' });

      return {
        hasError: false,
        message: data._id!
      }


    } catch (error) {
      const errorPayload = http.handleError(error);
      if (errorPayload) return errorPayload;

      return {
        hasError: true,
        message: 'No controlled error. Please contact the administrator'
      }
    }

  }

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart,
      updateCartQuantity,
      removeCartProduct,
      updateAddress,
      createOrder
    }}>
      {children}
    </CartContext.Provider>
  )
}
