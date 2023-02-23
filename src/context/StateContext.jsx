import React, { createContext, useContext, useState } from "react";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, qty) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (checkProductInCart) {
      setTotalPrice((prevTotalPrice) =>
        prevTotalPrice + product.price * qty
      );
      setTotalQuantities((prevTotalQuantities) =>
        prevTotalQuantities + qty
      );

      setCartItems((prevCartItems) =>
        prevCartItems.map((cartProduct) => {
          if (cartProduct._id === product._id)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + qty,
            };
          return cartProduct;
        })
      );
    } else {
      setTotalPrice((prevTotalPrice) =>
        prevTotalPrice + product.price * qty
      );
      setTotalQuantities((prevTotalQuantities) =>
        prevTotalQuantities + qty
      );

      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, quantity: qty },
      ]);
    }

    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const incQty = (index) => {
    setQty((prevQty) => prevQty + 1);
    const newCartItems = [...cartItems];
    newCartItems[index].quantity++;
    setCartItems(newCartItems);

    const itemPrice = newCartItems[index].price;
    setTotalPrice((prevTotalPrice) => prevTotalPrice + itemPrice);
  };

  const decQty = (index) => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });

    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity--;
      const itemPrice = newCartItems[index].price;
      setTotalPrice((prevTotalPrice) => prevTotalPrice - itemPrice);
    }
    setCartItems(newCartItems);
  };

  const removeItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);

    const item = cartItems[index];
    const itemPrice = item.price * item.quantity;
    setTotalPrice((prevTotalPrice) => prevTotalPrice - itemPrice);
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        removeItem
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
