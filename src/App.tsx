import React, { useState, useEffect, useCallback, useRef, ChangeEvent, FormEvent } from 'react';
import { Leaf, Recycle, Shield, Award, ArrowRight, Phone, Mail, ChevronDown, Star, ChevronsRight, Menu, X, LucideIcon } from 'lucide-react';

// --- CONSTANTS ---
const TARGET_WHATSAPP_NUMBER = '917983882050';
const NAV_ITEMS = [
  { name: 'Benefits', href: '#benefits' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' },
];
const FORM_FIELDS = [
  { label: 'Full Name *', name: 'name', type: 'text', placeholder: 'Your Name', autocomplete: 'name' },
  { label: 'Email Address *', name: 'email', type: 'email', placeholder: 'you@example.com', autocomplete: 'email' },
  { label: 'Phone Number *', name: 'phone', type: 'tel', placeholder: '+91 00000 00000', autocomplete: 'tel' },
  { label: 'Company (Optional)', name: 'company', type: 'text', placeholder: 'Your Organization', autocomplete: 'organization' }
] as const;


// --- DATA ---
interface EnvironmentalBenefit {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}
interface ProductVariant {
  id: string;
  size: string;
  use: string;
  icon: string; // Emoji
  image: string;
}
interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  icon: LucideIcon;
  color: string;
  iconBgTo: string;
  highlight?: boolean;
}

const siteInfo = {
  slogan: "Sip Sustainably. Live Responsibly.",
  websiteName: "RootWave",
  websiteUrl: "www.rootwave.org",
  brandIntro: "RootWave creates bio-based alternatives from agricultural rice waste, promoting a circular economy and a healthier planet.",
  materialCore: "Rice flour, tapioca starch, water. Agri-waste cleaned, ground, molded. 100% food-grade, edible, and biodegrades in weeks.",
  environmentalBenefits: [
    { id: 'benefit-zero-waste', icon: Recycle, title: "Zero Waste Cycle", desc: "Utilizes agricultural by-products, turning waste into value." },
    { id: 'benefit-eco-friendly', icon: Leaf, title: "Purely Eco-Friendly", desc: "Crafted with no plastics or synthetic materials, kind to Earth." },
    { id: 'benefit-biodegradable', icon: Star, title: "Rapidly Biodegradable", desc: "Decomposes naturally in weeks, not centuries." },
    { id: 'benefit-safe-vegan', icon: Shield, title: "Safe, Vegan & Edible", desc: "Food-grade, gluten-free, cruelty-free, and even edible." }
  ] as EnvironmentalBenefit[],
  productVariants: [
    { id: 'prod-6.5mm', size: '6.5mm', use: 'Water, Juice, Tea, Soda', icon: '💧', image: '/1.png' },
    { id: 'prod-8mm', size: '8mm', use: 'Smoothies, Milkshakes', icon: '🥤', image: '/2.png' },
    { id: 'prod-10mm', size: '10mm', use: 'Thick Shakes, Fruit Blends', icon: '🍓', image: '/3.png' },
    { id: 'prod-13mm', size: '13mm', use: 'Bubble Tea, Jelly Drinks', icon: '🧋', image: '/4.png' }
  ] as ProductVariant[],
  customization: {
    colors: "Multiple vibrant color variants available at no extra charge (White, Orange, Green, Black, Red).",
    pouch: "Custom-branded eco-pouches for bulk orders (Min: 30,000 pcs, Setup: ₹10,000)."
  },
  qualityControl: "Rigorous 4-stage quality assurance: Material Inspection, Manufacturing Control, Packaging Verification, Final Approval for perfection.",
  vsPlastic: "Plastic: Non-biodegradable (400+ yrs), fossil fuel-based, pollutes ecosystems. Our Straws: Biodegradable (weeks), plant-based, nourishes soil.",
  vsPaper: "Paper: Often soggy, impacts taste, may contain non-compostable coatings. Our Straws: Durable, neutral taste, 100% home compostable.",
  contactTeam: [
    { id: 'team-girish', name: 'Girish Sp', role: 'Chief Executive Officer', email: 'info@rootwave.org', phone: '+91 77600 21026', icon: Award, color: 'green-500', iconBgTo: 'emerald-600' },
    { id: 'team-arpan', name: 'Arpan Tiwari', role: 'Chief Operations Officer', email: 'arpan@rootwave.org', phone: '+91 83195 45466', icon: Award, color: 'green-500', iconBgTo: 'emerald-600' },
    { id: 'team-prateek', name: 'Prateek P.', role: 'CEO & Chief Marketing Officer', email: 'prateek@rootwave.org', phone: '+91 79838 82050', icon: Award, color: 'green-600', iconBgTo: 'emerald-700', highlight: true }
  ] as TeamMember[],
  logoPath: "/logo icon -svg-01.png",
  heroImage: "/DSC03065.JPG", 
  lifestyleImage: "/DSC03089.JPG",
};

// --- HELPER: Set Meta Tag --- (Same as before)
const setMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
  let element = document.querySelector(isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    if (isProperty) element.setAttribute('property', nameOrProperty);
    else element.setAttribute('name', nameOrProperty);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

// --- SECTION HEADING IDs --- (Same as before)
const sectionHeadingIds = {
  benefits: "benefits-heading",
  products: "products-heading",
  order: "order-heading",
  contact: "contact-heading",
};


// --- SUB-COMPONENTS ---

// Header Component
interface HeaderProps { /* Same as before */ isMobileMenuOpen: boolean; onMobileMenuToggle: () => void; onNavLinkClick: () => void; menuButtonRef: React.RefObject<HTMLButtonElement>;}
const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, onMobileMenuToggle, onNavLinkClick, menuButtonRef }) => (
  <header role="navigation" className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16 md:h-20">
        <a href="#" className="flex items-center group" onClick={onNavLinkClick}>
          <img src={siteInfo.logoPath} alt={`${siteInfo.websiteName} Logo`} className="w-10 h-10 md:w-11 md:h-11" width="44" height="44" />
          <span className="ml-2.5 text-xl md:text-2xl font-semibold tracking-tight text-slate-800 group-hover:text-green-600 transition-colors duration-300">{siteInfo.websiteName}</span>
        </a>
        
        <nav className="hidden sm:flex items-center space-x-6 lg:space-x-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.name} href={item.href} onClick={onNavLinkClick} className="text-sm lg:text-[15px] font-medium text-slate-600 hover:text-green-600 transition-colors duration-300 relative group">
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#order" onClick={onNavLinkClick}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-[15px] font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
          >
            Get Free Samples
          </a>
        </nav>

        <div className="sm:hidden flex items-center">
          <a 
            href="#order" onClick={onNavLinkClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-xs font-semibold transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 mr-2"
          >
            Free Samples
          </a>
          <button
            ref={menuButtonRef}
            onClick={onMobileMenuToggle}
            className="text-slate-700 hover:text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500 p-2 rounded-md"
            aria-label="Toggle main menu" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu-dropdown"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>

    {isMobileMenuOpen && (
      <nav id="mobile-menu-dropdown" className="sm:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-slate-200/60 absolute w-full" aria-label="Mobile navigation">
        <div className="px-3 pt-2 pb-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name} href={item.href} onClick={onNavLinkClick}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    )}
  </header>
);

// Hero Section Component
interface HeroSectionProps { isVisible: boolean; }
const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => (
  <section aria-label={`Hero section for ${siteInfo.websiteName}`} className={`relative pt-36 md:pt-44 pb-28 md:pb-40 overflow-hidden`}>
    {/* Background image with a subtle dark overlay for better text contrast */}
    <div className="absolute inset-0">
        <img src={siteInfo.heroImage} alt="Lush green rice paddy field, symbolizing sustainability" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div> {/* Dark overlay */}
    </div>

    {/* Decorative blobs and gradient overlay */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-emerald-500/20 to-teal-600/10 opacity-70"></div>
      {/* Ensure `animate-pulse-slow` and `animation-delay-2000` are defined in Tailwind config or CSS */}
      <div className="absolute top-1/4 left-1/4 w-60 h-60 md:w-96 md:h-96 bg-green-300/20 rounded-full filter blur-3xl animate-pulse-slow opacity-60"></div>
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 md:w-96 md:h-96 bg-emerald-300/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000 opacity-60"></div>
    </div>
    
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 md:mb-8 leading-tight tracking-tighter text-white transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="block drop-shadow-md"> {/* Added drop-shadow for better readability */}
            {siteInfo.slogan.split('.')[0]}.
          </span>
          <span className="block drop-shadow-md">{siteInfo.slogan.split('.')[1].trim()}.</span>
        </h1>
        <p className={`text-lg md:text-xl text-slate-100 font-normal mb-10 md:mb-12 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {siteInfo.brandIntro} Experience the future of eco-friendly sipping.
          Your <span className="font-semibold text-green-300">FREE samples</span> await.
        </p>
        <a 
          href="#order"
          className={`group inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3.5 md:px-10 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 delay-300 focus-visible:ring-4 focus-visible:ring-green-400/70 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        >
          Claim Your Free Rice Straws
          <ArrowRight className="ml-2.5 md:ml-3 h-5 w-5 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
        </a>
    </div>
  </section>
);

// Benefit Card Component
const BenefitCard: React.FC<{benefit: EnvironmentalBenefit, isVisible: boolean, idx: number}> = React.memo(({ benefit, isVisible, idx }) => (
  <div className={`bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl border border-slate-200/70 transition-all duration-300 transform hover:-translate-y-1.5 delay-${idx * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mb-5 shadow-md`}>
      <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
    </div>
    <h3 className="font-semibold text-lg md:text-xl mb-2 text-slate-800">{benefit.title}</h3>
    <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">{benefit.desc}</p>
  </div>
));

// Benefits Section Component
interface BenefitsSectionProps { isVisible: boolean; }
const BenefitsSection: React.FC<BenefitsSectionProps> = ({ isVisible }) => (
  <section id="benefits" aria-labelledby={sectionHeadingIds.benefits} className="py-20 md:py-28 bg-slate-50"> {/* Softer background */}
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h2 id={sectionHeadingIds.benefits} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-800 leading-tight">
            Why Choose <br className="hidden md:block" /> <span className="text-green-600">{siteInfo.websiteName}</span> Straws?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light mb-8 max-w-lg leading-relaxed">
            A simple choice with a profound impact on our planet and your sipping experience. Crafted for conscious consumers without compromising on quality.
          </p>
          <div className="mt-8 text-sm md:text-[15px] text-slate-700 bg-green-50 p-6 rounded-xl border border-green-200">
            <p className="font-medium mb-1.5 text-slate-800">Our rice straws are meticulously crafted from {siteInfo.materialCore.split('.')[0].toLowerCase()}, agricultural waste, and purified water.</p>
            <p className="text-xs sm:text-sm text-slate-600">{siteInfo.materialCore.split('.').slice(1).join('.').trim()}</p>
          </div>
        </div>
        <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <img src={siteInfo.lifestyleImage} alt={`${siteInfo.websiteName} rice straws enhancing a beverage experience`} loading="lazy" className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3.2] transform hover:scale-105 transition-transform duration-500" />
          <div className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 bg-white/80 backdrop-blur-md p-3.5 sm:p-4 rounded-full shadow-xl border border-slate-200/50">
              <Leaf className="h-7 w-7 sm:h-8 sm:w-8 text-green-500" aria-hidden="true"/>
          </div>
        </div>
      </div>
      <div className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {siteInfo.environmentalBenefits.map((benefit, idx) => (
          <BenefitCard key={benefit.id} benefit={benefit} isVisible={isVisible} idx={idx} />
        ))}
      </div>
    </div>
  </section>
);

// Product Card Component
const ProductCard: React.FC<{product: ProductVariant, isVisible: boolean, idx: number}> = React.memo(({ product, isVisible, idx }) => (
  <div className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-slate-200/70 transition-all duration-300 transform hover:-translate-y-1.5 delay-${idx * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
    <div className="overflow-hidden">
      <img src={product.image} alt={`${product.size} ${siteInfo.websiteName} Rice Straw`} loading="lazy" className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"/>
    </div>
    <div className="p-6 text-center">
      <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-slate-800">{product.size}</h3>
      <p className="text-slate-600 text-sm sm:text-[15px] mb-5 h-12 flex items-center justify-center">{product.use}</p>
      <a href="#order" className="inline-block text-sm font-semibold bg-green-100 text-green-700 px-6 py-2.5 rounded-lg shadow-sm hover:bg-green-200 hover:text-green-800 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500">
          Get FREE Samples
      </a>
    </div>
  </div>
));

// Products Section Component
interface ProductsSectionProps { isVisible: boolean; }
const ProductsSection: React.FC<ProductsSectionProps> = ({ isVisible }) => (
  <section id="products" aria-labelledby={sectionHeadingIds.products} className="py-20 md:py-28 bg-white">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 md:mb-20">
        <h2 id={sectionHeadingIds.products} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-slate-800 tracking-tight">Perfect Size for Every Sip</h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
          Our diverse range ensures the ideal straw for any beverage. All available as <span className="font-semibold text-green-600">complimentary {siteInfo.websiteName} samples</span>.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {siteInfo.productVariants.map((product, idx) => (
          <ProductCard key={product.id} product={product} isVisible={isVisible} idx={idx} />
        ))}
      </div>
      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700">
        {/* Using a slightly more distinct background for these info cards */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 shadow-lg">
            <h3 className="font-semibold text-lg sm:text-xl text-green-600 mb-3.5">Customization & Quality</h3>
            <p className="mb-2.5 text-xs sm:text-sm leading-relaxed"><strong className="text-slate-800">Vibrant Colors:</strong> {siteInfo.customization.colors}</p>
            <p className="mb-3.5 text-xs sm:text-sm leading-relaxed"><strong className="text-slate-800">Branded Eco-Pouches:</strong> {siteInfo.customization.pouch}</p>
            <p className="text-xs sm:text-sm leading-relaxed"><strong className="text-slate-800">Our Quality Promise:</strong> {siteInfo.qualityControl}</p>
        </div>
        <div className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 shadow-lg">
            <h3 className="font-semibold text-lg sm:text-xl text-green-600 mb-3.5">The Superior Eco-Choice</h3>
            <p className="mb-2.5 text-xs sm:text-sm leading-relaxed"><strong className="text-slate-800">vs. Plastic:</strong> {siteInfo.vsPlastic}</p>
            <p className="text-xs sm:text-sm leading-relaxed"><strong className="text-slate-800">vs. Paper:</strong> {siteInfo.vsPaper}</p>
        </div>
      </div>
    </div>
  </section>
);

// Order Form Section Component
interface OrderFormSectionProps { /* Same as before */ formData: FormData; isFormValid: boolean; onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; onSubmit: (e: FormEvent) => void; }
const OrderFormSection: React.FC<OrderFormSectionProps> = ({ formData, isFormValid, onInputChange, onSubmit }) => (
  <section id="order" aria-labelledby={sectionHeadingIds.order} className="py-20 md:py-28 bg-slate-50"> {/* Softer background */}
    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 md:mb-16">
        <h2 id={sectionHeadingIds.order} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">Request Your FREE Rice Straw Boxes</h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed">
          Simply provide your details, and we'll connect via WhatsApp to arrange your complimentary pack of sustainable straws.
        </p>
      </div>
      <form role="form" onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 border border-slate-200/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
          {FORM_FIELDS.map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
              <input
                type={field.type} name={field.name} id={field.name}
                value={formData[field.name as keyof FormData]}
                onChange={onInputChange} required={field.label.includes('*')}
                autoComplete={field.autocomplete}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-sm placeholder-slate-400 shadow-sm"
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-1.5">Sample Quantity *</label>
            <input
              type="number" name="quantity" id="quantity"
              value={formData.quantity} onChange={onInputChange}
              required min="1" placeholder="e.g., 50"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-sm placeholder-slate-400 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Size</label>
            <div className="relative">
              <select
                name="size" id="size" value={formData.size} onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none bg-white text-sm shadow-sm"
              >
                {siteInfo.productVariants.map(p => <option key={p.id} value={p.size}>{p.size} - {p.use.split(',')[0]}</option>)}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message (Optional)</label>
          <textarea
            name="message" id="message" value={formData.message} onChange={onInputChange}
            rows={3} placeholder="Any specific requirements or questions for our team?"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none bg-white text-sm placeholder-slate-400 shadow-sm"
          />
        </div>
        <button
          type="submit" disabled={!isFormValid}
          className={`w-full py-3.5 sm:py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform ${
            isFormValid
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          Send Request via WhatsApp
          {isFormValid && <ChevronsRight className="ml-2.5 h-5 w-5" aria-hidden="true" />}
        </button>
        <p className="text-xs text-slate-500 text-center mt-6">
          We value your privacy. Your details are used solely for fulfilling your sample request.
        </p>
      </form>
    </div>
  </section>
);

// Team Member Card Component
const TeamMemberCard: React.FC<{member: TeamMember}> = React.memo(({ member }) => (
  <div className={`group bg-white text-center p-6 md:p-8 rounded-2xl shadow-xl border border-slate-200/70 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1.5 ${member.highlight ? 'border-green-300 hover:border-green-400 ring-2 ring-green-200' : 'hover:border-slate-300'}`}>
    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-${member.color} to-${member.iconBgTo} rounded-full mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
      <member.icon className="h-9 w-9 text-white" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-semibold mb-1 text-slate-800">{member.name}</h3>
    <p className="text-slate-500 text-sm mb-5 font-medium">{member.role}</p>
    <div className="space-y-2.5 text-sm">
      <a href={`mailto:${member.email}`} className="flex items-center justify-center space-x-2 text-slate-600 hover:text-green-600 transition-colors group/link duration-200">
        <Mail className="h-4 w-4 text-slate-400 group-hover/link:text-green-500 transition-colors duration-200" aria-hidden="true" />
        <span className="font-medium tracking-tight">{member.email}</span>
      </a>
      <a href={`https://wa.me/${member.phone.replace(/\s|\+/g, '')}`} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center space-x-2 text-slate-600 hover:text-green-600 transition-colors group/link duration-200 ${member.highlight ? 'font-semibold' : ''}`}>
        <Phone className="h-4 w-4 text-slate-400 group-hover/link:text-green-500 transition-colors duration-200" aria-hidden="true" />
        <span className="font-medium tracking-tight">{member.phone} (WhatsApp)</span>
      </a>
    </div>
  </div>
));

// Contact Section Component
const ContactSection: React.FC = () => (
  <section id="contact" aria-labelledby={sectionHeadingIds.contact} className="py-20 md:py-28 bg-white">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 md:mb-20">
        <h2 id={sectionHeadingIds.contact} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight text-slate-800">
          Meet the <span className="text-green-600">{siteInfo.websiteName}</span> Visionaries
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed">
          Our passionate team is dedicated to sustainability and ready to assist you on your eco-journey.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteInfo.contactTeam.map(member => <TeamMemberCard key={member.id} member={member} /> )}
      </div>
    </div>
  </section>
);

// Footer Component
const Footer: React.FC = () => (
  <footer role="contentinfo" className="bg-slate-800 text-slate-300 py-16 md:py-20"> {/* Darker footer for contrast */}
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <a href="#" className="flex items-center group">
          <img src={siteInfo.logoPath} alt={`${siteInfo.websiteName} Logo`} className="w-10 h-10 md:w-11 md:h-11" width="44" height="44" />
          <span className="ml-2.5 text-xl md:text-2xl font-semibold tracking-tight text-white group-hover:text-green-400 transition-colors duration-300">{siteInfo.websiteName}</span>
        </a>
      </div>
      <p className="text-base sm:text-lg text-slate-200 font-light mb-8 max-w-xl mx-auto">{siteInfo.slogan}</p>
      <p className="text-xs sm:text-sm text-slate-400">
        © {new Date().getFullYear()} {siteInfo.websiteName} | <a href={`https://${siteInfo.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors duration-200">{siteInfo.websiteUrl}</a> | All Rights Reserved.
      </p>
    </div>
  </footer>
);


// --- MAIN APP COMPONENT --- (Logic mostly same as before, focus was on sub-component styling)
interface FormData { name: string; email: string; phone: string; company: string; quantity: string; size: string; message: string; }
const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', company: '', quantity: '', size: siteInfo.productVariants[0]?.size || '6.5mm', message: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsVisible(true);
    document.documentElement.lang = 'en';
    document.title = `${siteInfo.websiteName} - Sustainable Rice Straws | Eco-Friendly Alternatives`;
    setMetaTag('description', `Discover ${siteInfo.websiteName}'s 100% biodegradable and edible rice straws made from agricultural waste. Request your FREE samples today and join the sustainable sipping revolution!`);
    setMetaTag('keywords', 'rice straws, biodegradable straws, eco-friendly straws, sustainable products, RootWave, agricultural waste, zero waste, edible straws, compostable straws');
    setMetaTag('og:title', `${siteInfo.websiteName} - Sustainable Rice Straws`, true);
    setMetaTag('og:description', 'Eco-friendly, edible, and 100% biodegradable rice straws. Make the switch!', true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', `https://${siteInfo.websiteUrl}`, true);
    setMetaTag('og:image', `https://${siteInfo.websiteUrl}${siteInfo.heroImage}`, true); // Assuming heroImage is in public
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', `${siteInfo.websiteName} - Sustainable Rice Straws`);
    setMetaTag('twitter:description', 'Eco-friendly, edible, and 100% biodegradable rice straws.');
    setMetaTag('twitter:image', `https://${siteInfo.websiteUrl}${siteInfo.heroImage}`, true);
  }, []);

  useEffect(() => {
    const { name, email, phone, quantity } = formData;
    setIsFormValid(!!(name && email && /^\S+@\S+\.\S+$/.test(email) && phone.length > 5 && quantity && !isNaN(Number(quantity)) && Number(quantity) > 0)); // Basic email and phone validation
  }, [formData]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    htmlElement.style.scrollBehavior = 'smooth';
    return () => { 
      document.body.style.overflow = 'unset';
      htmlElement.style.scrollBehavior = 'auto'; 
    };
  }, [isMobileMenuOpen]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    const message = `🌾 *FREE RICE STRAW ORDER REQUEST*
👤 Name: ${formData.name} | Email: ${formData.email} | Phone: ${formData.phone} | Company: ${formData.company || 'N/A'}
📦 Quantity: ${formData.quantity} pcs | Size: ${formData.size} | Message: ${formData.message || 'N/A'}
*Request from ${siteInfo.websiteName} Website*`;
    const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [formData, isFormValid]);

  const handleMobileMenuToggle = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);
  const handleNavLinkClick = useCallback(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  return (
    <div className={`min-h-screen bg-white text-slate-800 font-sans antialiased overflow-x-hidden transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
        onNavLinkClick={handleNavLinkClick}
        menuButtonRef={menuButtonRef}
      />
      <main>
        <HeroSection isVisible={isVisible} />
        <BenefitsSection isVisible={isVisible} />
        <ProductsSection isVisible={isVisible} />
        <OrderFormSection 
          formData={formData}
          isFormValid={isFormValid}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;