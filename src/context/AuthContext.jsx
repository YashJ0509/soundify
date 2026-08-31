import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("soundify_user");
    return saved
      ? JSON.parse(saved)
      : {
          id: "usr_9918",
          name: "Alexander Vance",
          email: "alexander.vance@soundify.io",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
          shippingAddress: "742 Studio Sound Boulevard, Suite 100, San Francisco, CA 94107"
        };
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("soundify_orders");
    return saved
      ? JSON.parse(saved)
      : [
          {
            orderId: "SND-849204",
            date: "2026-02-14",
            status: "Delivered",
            total: 399.99,
            items: [
              {
                id: 1,
                name: "Sony WH-1000XM5",
                price: 399.99,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&auto=format&fit=crop&q=80"
              }
            ]
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem("soundify_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("soundify_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      orderId: `SND-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Processing",
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, orders, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);