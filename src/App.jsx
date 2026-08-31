import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ShopProvider, useShop } from "./context/ShopContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import QuickViewModal from "./components/QuickViewModal";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage"; // Added Login Page import
import StaticPolicyPage from "./pages/StaticPolicyPage"; // For Terms/Privacy/Warranty

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { toast, setToast } = useShop();

  return (
    <div className="min-h-screen bg-[#07080b] text-zinc-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      <div>
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onSelectProduct={(prod) => {
                    setSelectedProduct(prod);
                  }} 
                />
              } 
            />
            <Route 
              path="/shop" 
              element={
                <ShopPage 
                  onSelectProduct={(prod) => {
                    setSelectedProduct(prod);
                  }} 
                />
              } 
            />
            <Route path="/about" element={<AboutPage />} />
            <Route 
              path="/product/:id" 
              element={<ProductDetailPage product={selectedProduct} />} 
            />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} /> {/* Added Login Route */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/policy/:type" element={<StaticPolicyPage />} />
          </Routes>
        </main>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
      />

      <QuickViewModal />

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <AppContent />
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
}