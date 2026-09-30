"use client";

import React, { useState } from 'react';
import { translations } from './translations';

export default function AfghanShosee() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const isRTL = lang === 'fa' || lang === 'ps';

  // --- Carousel State ---
  const sneakerImages = [
    "/images/pngwing.com (4).png",
    "/images/pngwing.com (5).png",
    "/images/pngwing.com (6).png",
    "/images/pngwing.com.png",
    "/images/pngwing.com (2).png",
    "/images/pngwing.com (1).png"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % sneakerImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + sneakerImages.length) % sneakerImages.length);

  // --- Cart & Wishlist Logic ---
  const [selectedSize, setSelectedSize] = useState(null);
  const [notification, setNotification] = useState("");

  // Current product data (static for now, but includes selected size)
  const getProductData = () => ({
    id: 'peshawari-chappal-1',
    name: t.hero.title,
    price: 85,
    image: sneakerImages[currentImageIndex],
    size: selectedSize || 'N/A',
  });

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(lang === 'en' ? "Please select a size first!" : lang === 'fa' ? "لطفاً ابتدا سایز را انتخاب کنید!" : "مهرباني وکړئ لومړی اندازه وټاکئ!");
      return;
    }
    
    const product = getProductData();
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists with the same size
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id && item.size === product.size);
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setNotification(t.cart.added);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleAddToWishlist = () => {
    const product = getProductData();
    // Remove size for wishlist
    const { size, ...wishlistProduct } = product; 
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Check if already in wishlist
    if (!existingWishlist.find(item => item.id === wishlistProduct.id)) {
      existingWishlist.push(wishlistProduct);
      localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
    }
    
    setNotification(t.cart.added);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="w-full bg-[#151515] text-white font-sans overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#b8573e] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-in fade-in slide-in-from-top-4">
          {notification}
        </div>
      )}

      {/* ==========================================
          SECTION 1: HERO SECTION
      ========================================== */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-[#b8573e] rounded-full blur-3xl opacity-30 mix-blend-screen pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[60vh] bg-[#f4ebd9] rounded-tl-[100%] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-[#222222] rounded-tr-[100%] pointer-events-none z-0"></div>

        {/* Navigation */}
        <nav className="relative z-20 flex justify-between items-center px-8 py-6 md:px-16 lg:px-24">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-[#b8573e] font-bold text-xl">//</span>
            <span className="font-bold tracking-widest text-sm uppercase text-white">Afghan Shosee</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-widest uppercase text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#details" className="hover:text-white transition-colors">{t.nav.heritage}</a>
            <a href="#reviews" className="hover:text-white transition-colors">{t.nav.reviews}</a>
            <a href="/cart" className="hover:text-white transition-colors">{t.nav.shop}</a>
            <a href="#" className="hover:text-white transition-colors">{t.nav.contact}</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 border border-gray-700 rounded-full px-3 py-1">
              <button onClick={() => setLang('en')} className={`hover:text-white transition-colors ${lang === 'en' ? 'text-[#b8573e]' : ''}`}>EN</button>
              <span className="text-gray-600">|</span>
              <button onClick={() => setLang('fa')} className={`hover:text-white transition-colors ${lang === 'fa' ? 'text-[#b8573e]' : ''}`}>دری</button>
              <span className="text-gray-600">|</span>
              <button onClick={() => setLang('ps')} className={`hover:text-white transition-colors ${lang === 'ps' ? 'text-[#b8573e]' : ''}`}>پښتو</button>
            </div>
            
            {/* Cart Icon Link */}
            <a href="/cart" className="w-8 h-8 rounded-full bg-[#b8573e] flex items-center justify-center hover:bg-[#a04a32] transition-colors relative">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className={`relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 md:px-16 lg:px-24 items-center pb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          <div className={`flex flex-col justify-center max-w-lg mt-12 lg:mt-0 order-2 lg:order-1 ${isRTL ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#b8573e]/20 text-[#b8573e] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-[#b8573e]/30">
                {t.hero.badge}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xs">★★★★★</span>
                <span className="text-gray-400 text-[10px]">(4.9 / 1,200)</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#e5d3b3] leading-[1.1] mb-6 uppercase tracking-tight">
              {t.hero.title}
            </h1>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t.hero.desc}
            </p>

            {/* Color & Size Selectors */}
            <div className={`space-y-4 mb-8 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-2">{t.hero.color}</span>
                <div className={`flex gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  <div className="w-6 h-6 rounded-full bg-[#b8573e] ring-2 ring-offset-2 ring-offset-[#151515] ring-[#b8573e] cursor-pointer"></div>
                  <div className="w-6 h-6 rounded-full bg-[#4a3b32] cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#151515] hover:ring-gray-500 transition-all"></div>
                  <div className="w-6 h-6 rounded-full bg-[#d4c3a3] cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#151515] hover:ring-gray-500 transition-all"></div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-2">{t.hero.size}</span>
                <div className={`flex gap-2 flex-wrap ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {['7', '8', '9', '10', '11', '12'].map((size) => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 border text-xs font-bold flex items-center justify-center rounded transition-colors ${
                        selectedSize === size 
                          ? 'border-[#b8573e] bg-[#b8573e] text-white' 
                          : 'border-gray-700 text-gray-400 hover:border-[#b8573e] hover:text-[#b8573e]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`flex gap-4 items-center mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button 
                onClick={handleAddToCart}
                className="bg-[#b8573e] hover:bg-[#a04a32] text-white text-[11px] font-bold tracking-widest uppercase py-4 px-8 rounded-full transition-all duration-300 flex-1 md:flex-none"
              >
                {t.hero.cart}
              </button>
              <button 
                onClick={handleAddToWishlist}
                className="border border-gray-600 hover:border-white text-white text-[11px] font-bold tracking-widest uppercase py-4 px-8 rounded-full transition-all duration-300"
              >
                {t.hero.wishlist}
              </button>
            </div>

            {/* Trust Badges */}
            <div className={`flex gap-8 border-t border-gray-800 pt-6 w-full ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <svg className="w-3 h-3 text-[#b8573e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t.hero.shipping}
                </span>
                <span className="text-[9px] text-gray-500 uppercase">{t.hero.shippingSub}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <svg className="w-3 h-3 text-[#b8573e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  {t.hero.returns}
                </span>
                <span className="text-[9px] text-gray-500 uppercase">{t.hero.returnsSub}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Sneaker Carousel */}
          <div className="relative flex flex-col justify-center items-center h-[400px] lg:h-[700px] w-full mt-12 lg:mt-0 order-1 lg:order-2">
            <div className="relative w-full h-full flex justify-center items-center">
              <img 
                key={currentImageIndex} 
                src={sneakerImages[currentImageIndex]} 
                alt={`Afghan Shosee Product ${currentImageIndex + 1}`} 
                className="relative z-20 w-[110%] max-w-[700px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] transform -rotate-12 lg:scale-110 transition-all duration-500 ease-in-out animate-in fade-in zoom-in-95"
              />
              {currentImageIndex === 0 && (
                <img 
                  src="https://images.unsplash.com/photo-1506801326067-54c94d19d4cb?q=80&w=400&auto=format&fit=crop" 
                  alt="Autumn Leaf" 
                  className="absolute bottom-[5%] right-[5%] z-30 w-32 md:w-56 object-contain mix-blend-multiply drop-shadow-2xl opacity-90 transition-opacity duration-500"
                />
              )}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-gray-600/30 rounded-full z-0 pointer-events-none"></div>
            </div>

            <div className="absolute bottom-0 lg:bottom-10 z-40 flex items-center gap-6 bg-[#1a1a1a]/80 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700">
              <button onClick={prevImage} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <div className="flex gap-2">
                {sneakerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-[#b8573e] w-6' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button onClick={nextImage} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: FEATURES
      ========================================== */}
      <section id="features" className="py-24 px-8 md:px-16 lg:px-24 bg-[#111111] relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#e5d3b3] uppercase tracking-tight mb-4">{t.features.title}</h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">{t.features.desc}</p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {[t.features.f1Title, t.features.f2Title, t.features.f3Title].map((title, i) => (
            <div key={i} className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 hover:border-[#b8573e]/50 transition-colors group">
              <div className={`w-12 h-12 bg-[#b8573e]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#b8573e]/20 transition-colors ${isRTL ? 'ml-auto' : ''}`}>
                {i === 0 && <svg className="w-6 h-6 text-[#b8573e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                {i === 1 && <svg className="w-6 h-6 text-[#b8573e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
                {i === 2 && <svg className="w-6 h-6 text-[#b8573e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">{title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                {i === 0 ? t.features.f1Desc : i === 1 ? t.features.f2Desc : t.features.f3Desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 3: DETAILS / HERITAGE
      ========================================== */}
      <section id="details" className="py-24 px-8 md:px-16 lg:px-24 bg-[#151515] relative z-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop" alt="Detail 1" className="w-full h-64 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" alt="Detail 2" className="w-full h-64 object-cover rounded-2xl mt-8" />
            <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" alt="Detail 3" className="w-full h-64 object-cover rounded-2xl -mt-8" />
            <img src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=800&auto=format&fit=crop" alt="Detail 4" className="w-full h-64 object-cover rounded-2xl" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#e5d3b3] uppercase tracking-tight mb-6">{t.heritage.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{t.heritage.desc}</p>
            <ul className="space-y-4 mb-8">
              {[t.heritage.item1Title, t.heritage.item2Title, t.heritage.item3Title].map((title, i) => (
                <li key={i} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b8573e] mt-1.5 shrink-0"></div>
                  <div>
                    <h4 className="text-white text-sm font-bold uppercase tracking-wider">{title}</h4>
                    <p className="text-gray-500 text-xs mt-1">
                      {i === 0 ? t.heritage.item1Desc : i === 1 ? t.heritage.item2Desc : t.heritage.item3Desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button className={`text-[#b8573e] text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:text-white transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
              {t.heritage.btn}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: REVIEWS
      ========================================== */}
      <section id="reviews" className="py-24 px-8 md:px-16 lg:px-24 bg-[#111111] relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#e5d3b3] uppercase tracking-tight mb-4">{t.reviews.title}</h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">{t.reviews.desc}</p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {[t.reviews.r1, t.reviews.r2, t.reviews.r3].map((review, i) => (
            <div key={i} className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800">
              <div className={`flex items-center gap-1 text-yellow-500 text-xs mb-4 ${isRTL ? 'justify-end' : ''}`}>{i === 2 ? '★★★★☆' : '★★★★★'}</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{review}"</p>
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-${i === 0 ? '1494790108377-be9c29b29330' : i === 1 ? '1507003211169-0a1dd7228f2d' : '1438761681033-6461ffad8d80'}?q=80&w=150&auto=format&fit=crop`} alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">{i === 0 ? 'Zarmina A.' : i === 1 ? 'Ahmad F.' : 'Farid K.'}</h4>
                  <span className="text-gray-500 text-[10px]">Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 5: FOOTER
      ========================================== */}
      <footer className={`bg-[#0a0a0a] pt-20 pb-10 px-8 md:px-16 lg:px-24 relative z-20 border-t border-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className={`flex items-center gap-2 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-[#b8573e] font-bold text-xl">//</span>
              <span className="font-bold tracking-widest text-sm uppercase text-white">Afghan Shosee</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm mb-8">{t.footer.desc}</p>
            <div className={`flex gap-2 max-w-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <input type="email" placeholder={t.footer.placeholder} className={`bg-[#1a1a1a] border border-gray-700 text-white text-xs px-4 py-3 rounded-lg w-full focus:outline-none focus:border-[#b8573e] transition-colors ${isRTL ? 'text-right' : 'text-left'}`} />
              <button className="bg-[#b8573e] hover:bg-[#a04a32] text-white text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-lg transition-colors whitespace-nowrap">{t.footer.subscribe}</button>
            </div>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">{t.footer.shop}</h4>
            <ul className="space-y-3 text-gray-400 text-xs">
              <li><a href="#" className="hover:text-[#b8573e] transition-colors">{t.heritage.item1Title}</a></li>
              <li><a href="#" className="hover:text-[#b8573e] transition-colors">{t.heritage.item2Title}</a></li>
              <li><a href="#" className="hover:text-[#b8573e] transition-colors">{t.heritage.item3Title}</a></li>
              <li><a href="/cart" className="hover:text-[#b8573e] transition-colors">{t.nav.shop}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">{t.footer.support}</h4>
            <ul className="space-y-3 text-gray-400 text-xs">
              <li><a href="#" className="hover:text-[#b8573e] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#b8573e] transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-[#b8573e] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-[#b8573e] transition-colors">Track Your Order</a></li>
            </ul>
          </div>
        </div>
        <div className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">&copy; {new Date().getFullYear()} Afghan Shosee. {t.footer.rights}</p>
          <div className={`flex gap-6 text-[10px] uppercase tracking-widest text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}