import Cart from "../models/AddToCartModel.js";

export const cart = async (cartId) => {
  try {
    const cartData = await Cart.findById(cartId);
    return cartData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addItem = async (cartData) => {
  try {
    const newCart = new Cart(cartData);
    return newCart;
  } catch (error) {
    throw new Error(error.message);
  }
};
