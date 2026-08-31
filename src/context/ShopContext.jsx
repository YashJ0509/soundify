import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

export const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [products] = useState(PRODUCTS);
  const [toast, setToast] = useState(null);
  
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("soundify_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("soundify_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("soundify_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("soundify_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setToast({ message: `Added ${product.name} to cart`, type: "cart" });
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        setToast({ message: `Removed from wishlist`, type: "wishlist" });
        return prev.filter((item) => item.id !== product.id);
      } else {
        setToast({ message: `Added to wishlist`, type: "wishlist" });
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const cartTotal = cart.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        setQuickViewProduct,
        toast,
        setToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}