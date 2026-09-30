"use client";

import React, { useState, useEffect } from 'react';
import { translations } from '../translations';

export default function CartPage() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const isRTL = lang === 'fa' || lang === 'ps';

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setCartItems(savedCart);
    setWishlistItems(savedWishlist);
    setIsLoaded(true);
  }, []);

  const removeFromCart = (id, size) => {
    const newCart = cartItems.filter(item => !(item.id === id && item.size === size));
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromWishlist = (id) => {
    const newWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Prevent hydration mismatch by not rendering until localStorage is loaded
  if (!isLoaded) return <div className="min-h-screen bg-[#151515]"></div>;

  return (
    <div className="min-h-screen bg-[#151515] text-white font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6 md:px-16 lg:px-24 border-b border-gray-800">
        <a href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-[#b8573e] font-bold text-xl">//</span>
          <span className="font-bold tracking-widest text-sm uppercase text-white">Afghan Shosee</span>
        </a>
        
        <div className="flex gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 border border-gray-700 rounded-full px-3 py-1">
          <button onClick={() => setLang('en')} className={`hover:text-white transition-colors ${lang === 'en' ? 'text-[#b8573e]' : ''}`}>EN</button>
          <span className="text-gray-600">|</span>
          <button onClick={() => setLang('fa')} className={`hover:text-white transition-colors ${lang === 'fa' ? 'text-[#b8573e]' : ''}`}>دری</button>
          <span className="text-gray-600">|</span>
          <button onClick={() => setLang('ps')} className={`hover:text-white transition-colors ${lang === 'ps' ? 'text-[#b8573e]' : ''}`}>پښتو</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-16">
        
        {/* --- CART SECTION --- */}
        <div className="mb-20">
          <h1 className="text-3xl md:text-4xl font-black text-[#e5d3b3] uppercase tracking-tight mb-8">
            {t.cart.title}
          </h1>

          {cartItems.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-12 text-center">
              <p className="text-gray-400 mb-6">{t.cart.empty}</p>
              <a href="/" className="inline-block bg-[#b8573e] hover:bg-[#a04a32] text-white text-xs font-bold tracking-widest uppercase py-4 px-8 rounded-full transition-colors">
                {t.cart.back}
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 flex gap-6 items-center">
                    <div className="w-24 h-24 bg-[#252525] rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-1">{item.name}</h3>
                      <p className="text-gray-400 text-xs mb-2">Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="text-[#b8573e] font-bold">${item.price * item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-gray-500 hover:text-red-500 transition-colors p-2"
                      aria-label={t.cart.remove}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 h-fit">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-gray-800 pb-4">
                  {t.cart.total}
                </h3>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-gray-400 text-sm">{t.cart.total}</span>
                  <span className="text-2xl font-black text-[#e5d3b3]">${calculateTotal()}</span>
                </div>
                <button className="w-full bg-[#b8573e] hover:bg-[#a04a32] text-white text-xs font-bold tracking-widest uppercase py-4 rounded-full transition-colors">
                  {t.cart.checkout}
                </button>
              </div>

            </div>
          )}
        </div>

        {/* --- WISHLIST SECTION --- */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-[#e5d3b3] uppercase tracking-tight mb-8">
            {t.cart.wishlistTitle}
          </h2>

          {wishlistItems.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-12 text-center">
              <p className="text-gray-400">{t.cart.wishlistEmpty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden group">
                  <div className="h-48 bg-[#252525] relative overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold uppercase tracking-wide text-xs mb-2">{item.name}</h3>
                    <p className="text-[#b8573e] font-bold mb-4">${item.price}</p>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-full border border-gray-700 hover:border-red-500 hover:text-red-500 text-gray-400 text-[10px] font-bold tracking-widest uppercase py-2 rounded-lg transition-colors"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}