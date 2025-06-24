import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { Shield, ArrowRight, Mail, CheckCircle, Phone, Gift, Star, Recycle, LucideIcon, Menu, X, Home, Briefcase, MapPin, Package } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import FloatingSampleButton from '@/components/FloatingSampleButton';

const TARGET_WHATSAPP_NUMBER = '917760021026';
const COMPANY_NAME = "RootWave";
const WEBSITE_URL = "www.rootwave.org";
const DATA_SUBMISSION_WEBHOOK_URL = 'https://hook.eu2.make.com/clrhjur8lnbh1hlkq9ecbivb4tkboyog';

// --- TYPE DEFINITIONS ---
interface EnvironmentalBenefit { 
  id: string; 
  icon: LucideIcon; 
  title: string; 
  desc: string; 
  color: string; 
}

interface ProductVariant { 
  id: string; 
  size: string; 
  use: string; 
  icon: string; 
  image: string; 
  description: string; 
}

// --- DATA ---
const siteInfo = {
  slogan: "Sip Sustainably. Live Responsibly.",
  websiteName: "RootWave",
  websiteUrl: "www.rootwave.org",
  brandIntro: "RootWave creates bio-based alternatives from agricultural rice waste, promoting a circular economy and a healthier planet.",
  logoPath: "/logo icon -svg-01.png",
  environmentalBenefits: [
    { id: 'benefit-zero-waste', icon: Recycle, title: "Zero Waste Cycle", desc: "Utilizes agricultural by-products, turning waste into value.", color: "emerald" },
    { id: 'benefit-eco-friendly', icon: Shield, title: "Purely Eco-Friendly", desc: "Crafted with no plastics or synthetic materials, kind to Earth.", color: "green" },
    { id: 'benefit-biodegradable', icon: Star, title: "Rapidly Biodegradable", desc: "Decomposes naturally in weeks, not centuries.", color: "yellow" },
    { id: 'benefit-safe-vegan', icon: Shield, title: "Safe, Vegan & Edible", desc: "Food-grade, gluten-free, cruelty-free, and even edible.", color: "blue" }
  ] as EnvironmentalBenefit[],
  productVariants: [
    { id: 'prod-6.5mm', size: '6.5mm', use: 'Water, Juice, Tea, Soda', icon: '💧', image: '/2.png', description: 'Perfect for everyday beverages and light drinks' },
    { id: 'prod-8mm', size: '8mm', use: 'Smoothies, Milkshakes', icon: '🥤', image: '/1.png', description: 'Ideal for medium-thick beverages and protein shakes' },
    { id: 'prod-10mm', size: '10mm', use: 'Thick Shakes, Fruit Blends', icon: '🍓', image: '/3.png', description: 'Great for thick smoothies and fruit-based drinks' },
    { id: 'prod-13mm', size: '13mm', use: 'Bubble Tea, Jelly Drinks', icon: '🧋', image: '/4.png', description: 'Perfect for bubble tea and drinks with toppings' }
  ] as ProductVariant[],
  vsPlastic: "Plastic: Non-biodegradable (400+ yrs), fossil fuel-based, pollutes ecosystems. Our Straws: Biodegradable (weeks), plant-based, nourishes soil.",
  vsPaper: "Paper: Often soggy, impacts taste, may contain non-compostable coatings. Our Straws: Durable, neutral taste, 100% home compostable.",
  contactEmail: "info@rootwave.org",
};

const BUSINESS_TYPES = [
  { value: '', label: 'Select type...' }, 
  { value: 'cafe', label: 'Cafe' }, 
  { value: 'restaurant', label: 'Restaurant' }, 
  { value: 'hotel', label: 'Hotel' },
  { value: 'bar', label: 'Bar/Pub' }, 
  { value: 'caterer', label: 'Caterer' }, 
  { value: 'distributor', label: 'Distributor/Wholesaler' },
  { value: 'retailer', label: 'Retailer' }, 
  { value: 'event_organizer', label: 'Event Organizer' }, 
  { value: 'other', label: 'Other' },
] as const;

type FormFieldConfig = {
  label: string; 
  name: keyof Omit<FormData, 'message'>; 
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'multiselect';
  placeholder: string; 
  autocomplete?: string; 
  icon?: LucideIcon; 
  options?: ReadonlyArray<{value: string; label: string}>;
}

const FORM_FIELDS_CONFIG: FormFieldConfig[] = [
  { label: 'Name', name: 'name', type: 'text', placeholder: 'Your full name', autocomplete: 'name' },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com', autocomplete: 'email' },
  { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX', autocomplete: 'tel' },
  { label: 'Pincode', name: 'pincode', type: 'text', placeholder: 'e.g., 110001', autocomplete: 'postal-code', icon: MapPin },
  { label: 'Full Address', name: 'address', type: 'textarea', placeholder: 'Your full delivery address', autocomplete: 'street-address', icon: Home },
  { label: 'Type of Business', name: 'businessType', type: 'select', placeholder: '', autocomplete: 'organization-type', options: BUSINESS_TYPES, icon: Briefcase },
  { label: 'Straw Sizes Required', name: 'strawSizes', type: 'multiselect', placeholder: '', icon: Package, options: siteInfo.productVariants.map(p => ({ value: p.size, label: p.size })) },
];

type FormData = {
  name: string; 
  email: string; 
  phone: string; 
  pincode: string; 
  address: string;
  businessType: typeof BUSINESS_TYPES[number]['value'] | ''; 
  strawSizes: string[]; 
  message: string;
};

// --- UI COMPONENTS ---
const Header: React.FC<{onCTAClick: () => void}> = ({ onCTAClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 w-full z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={siteInfo.logoPath} alt={`${COMPANY_NAME} Logo`} className="h-8 w-8 object-contain"/>
          <span className="font-bold text-lg text-gray-800">{COMPANY_NAME}</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#products" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Products</a>
          <a href="#benefits" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Benefits</a>
          <a href="#samples" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors" onClick={(e) => { e.preventDefault(); onCTAClick(); }}>Samples</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick={onCTAClick} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25">
            Free Samples
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
          <nav className="px-4 py-4 space-y-3">
            <a href="#products" className="block text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors" onClick={() => { setIsMobileMenuOpen(false); document.getElementById('products')?.scrollIntoView({behavior: 'smooth'}); }}>Products</a>
            <a href="#benefits" className="block text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors" onClick={() => { setIsMobileMenuOpen(false); document.getElementById('benefits')?.scrollIntoView({behavior: 'smooth'}); }}>Benefits</a>
            <a href="#samples" className="block text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onCTAClick();}}>Samples</a>
          </nav>
        </div>
      )}
    </header>
  );
};

const FreeBanner: React.FC<{onCTAClick: () => void}> = ({onCTAClick}) => (
  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 text-center cursor-pointer hover:from-emerald-600 hover:to-green-700 transition-all duration-300" onClick={onCTAClick}>
    <p className="flex items-center justify-center gap-2 text-sm font-semibold animate-pulse">
      <Gift className="h-4 w-4" />
      <span>🎉 Limited Time: Free Sample Campaign Active - Get Yours Now!</span>
    </p>
  </div>
);

const HeroSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => (
  <section className="relative pt-20 pb-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
    </div>
    <div className="relative text-center px-4 max-w-4xl mx-auto z-10">
      <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-emerald-200">
        <Gift className="h-4 w-4" />
        <span>Free samples available nationwide</span>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">{siteInfo.slogan}</h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto font-light">{siteInfo.brandIntro}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
        {siteInfo.environmentalBenefits.map((benefit, index) => (
          <div key={benefit.id} className="flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1">
            <div className={`w-12 h-12 bg-${benefit.color}-100 rounded-xl flex items-center justify-center mb-3`}>
              <benefit.icon className={`h-6 w-6 text-${benefit.color}-600`} />
            </div>
            <span className="text-sm font-semibold text-gray-800 text-center leading-tight">{benefit.title}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onCTAClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1">
          <span>Request Free Samples</span>
          <ArrowRight className="h-5 w-5" />
        </button>
        <button 
          onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} 
          className="text-emerald-600 hover:text-emerald-700 font-semibold px-8 py-4 rounded-2xl transition-colors duration-300 border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50">
          View Products
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-4">No payment required • Free nationwide shipping • 48-hour dispatch</p>
    </div>
  </section>
);

interface ProductCardProps { 
  product: ProductVariant; 
  idx: number; 
  onCTAClick: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, idx, onCTAClick }) => (
  <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2">
    <div className="relative overflow-hidden">
      <img src={product.image} alt={`${product.size} ${siteInfo.websiteName} Rice Straw`} loading="lazy" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"/>
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-emerald-600">{product.icon} {product.size}</div>
    </div>
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold mb-2 text-gray-900">{product.size} Rice Straw</h3>
      <p className="text-gray-600 text-sm mb-3 font-medium">{product.use}</p>
      <p className="text-gray-500 text-xs mb-6 leading-relaxed">{product.description}</p>
      <button 
        onClick={onCTAClick} 
        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-md border border-emerald-200 hover:border-emerald-300">
        Get FREE Sample
      </button>
    </div>
  </div>
));

const ProductShowcase: React.FC<{onCTAClick: () => void}> = ({ onCTAClick }) => (
  <section id="products" className="py-24 bg-gradient-to-br from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">Perfect Size for Every Sip</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Our diverse range ensures the ideal straw for any beverage. All available as <span className="font-bold text-emerald-600">complimentary {siteInfo.websiteName} samples</span>.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {siteInfo.productVariants.map((product, idx) => (
          <ProductCard key={product.id} product={product} idx={idx} onCTAClick={onCTAClick} />
        ))}
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 shadow-lg">
          <h3 className="font-bold text-xl text-blue-800 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            The Superior Eco-Choice
          </h3>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p><span className="font-semibold text-gray-900">vs. Plastic:</span> {siteInfo.vsPlastic}</p>
            <p><span className="font-semibold text-gray-900">vs. Paper:</span> {siteInfo.vsPaper}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection: React.FC = () => (
  <section id="benefits" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Why Choose RootWave?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Experience the perfect blend of sustainability, functionality, and innovation with every sip.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {siteInfo.environmentalBenefits.map((benefit, index) => (
          <div key={benefit.id} className="flex items-start gap-6 p-8 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-all duration-300">
            <div className={`w-16 h-16 bg-${benefit.color}-100 rounded-2xl flex items-center justify-center flex-shrink-0`}>
              <benefit.icon className={`h-8 w-8 text-${benefit.color}-600`} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SampleForm: React.FC<{
  formData: FormData; 
  isFormValid: boolean;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, fieldName?: keyof FormData, value?: string) => void;
  onSubmit: (e: FormEvent) => void; 
  isSubmitting: boolean;
  submissionStatus: 'idle' | 'success' | 'error' | 'webhook_error_csv_success';
}> = ({ formData, isFormValid, onInputChange, onSubmit, isSubmitting, submissionStatus }) => {
  const handleMultiSelectChange = (optionValue: string) => {
    const currentSizes = formData.strawSizes;
    const newSizes = currentSizes.includes(optionValue)
      ? currentSizes.filter(size => size !== optionValue)
      : [...currentSizes, optionValue];
    const mockEventTarget = { name: 'strawSizes', value: JSON.stringify(newSizes) };
    onInputChange({ target: mockEventTarget as any } as ChangeEvent<HTMLInputElement>, 'strawSizes', JSON.stringify(newSizes));
  };

  return (
    <section id="samples" className="py-24 bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Gift className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Request Free Samples</h2>
          <p className="text-gray-600 leading-relaxed">We'll send you a complete sample pack at no cost with free nationwide shipping</p>
        </div>
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
          <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
            <p className="text-emerald-700 font-semibold text-sm flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Free campaign active - No payment required
            </p>
          </div>
          {FORM_FIELDS_CONFIG.map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                {field.icon && <field.icon className="inline h-4 w-4 mr-1 mb-0.5 text-gray-500" />} {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea 
                  name={field.name} 
                  id={field.name} 
                  value={formData[field.name as 'address']} 
                  onChange={onInputChange} 
                  required 
                  rows={3} 
                  placeholder={field.placeholder} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none text-sm placeholder-gray-400 bg-gray-50 focus:bg-white" 
                  disabled={isSubmitting} 
                  autoComplete={field.autocomplete}
                />
              ) : field.type === 'select' ? (
                <select 
                  name={field.name} 
                  id={field.name} 
                  value={formData[field.name as 'businessType']} 
                  onChange={onInputChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm placeholder-gray-400 bg-gray-50 focus:bg-white appearance-none" 
                  disabled={isSubmitting} 
                  autoComplete={field.autocomplete}>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value} disabled={option.value === ''}>{option.label}</option>
                  ))}
                </select>
              ) : field.type === 'multiselect' ? (
                <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
                  {field.options?.map(option => (
                    <button 
                      type="button" 
                      key={option.value} 
                      onClick={() => handleMultiSelectChange(option.value)} 
                      disabled={isSubmitting}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                        formData.strawSizes.includes(option.value) 
                          ? 'bg-emerald-600 text-white border-emerald-600' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                      } ${isSubmitting ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : (
                <input 
                  type={field.type as string} 
                  name={field.name} 
                  id={field.name} 
                  value={formData[field.name as Exclude<keyof FormData, 'address' | 'businessType' | 'message' | 'strawSizes'>]} 
                  onChange={onInputChange} 
                  required 
                  autoComplete={field.autocomplete} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm placeholder-gray-400 bg-gray-50 focus:bg-white" 
                  placeholder={field.placeholder} 
                  disabled={isSubmitting}
                />
              )}
            </div>
          ))}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message (optional)</label>
            <textarea 
              name="message" 
              id="message" 
              value={formData.message} 
              onChange={onInputChange} 
              rows={3} 
              placeholder="Any specific requirements or questions?" 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none text-sm placeholder-gray-400 bg-gray-50 focus:bg-white" 
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit" 
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              isSubmitting 
                ? 'bg-gray-400 text-gray-700 cursor-wait' 
                : isFormValid 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}>
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <span>Send Sample Request</span>
                <CheckCircle className="h-4 w-4" />
              </>
            )}
          </button>
          {submissionStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm text-center">
              Request sent successfully! We'll contact you on WhatsApp. Your info has been recorded.
            </div>
          )}
          {submissionStatus === 'webhook_error_csv_success' && (
            <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg text-sm text-center">
              Request sent! We'll contact you. A CSV backup was made.
            </div>
          )}
          {submissionStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm text-center">
              Failed to record request. WhatsApp may have opened. Please try again or send details via WhatsApp if needed.
            </div>
          )}
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            We'll contact you via WhatsApp. Your details will be recorded. A CSV may be downloaded for backup.
          </p>
        </form>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-6">
          <img src={siteInfo.logoPath} alt={`${COMPANY_NAME} Logo`} className="h-12 w-12 object-contain mr-3"/>
          <span className="text-2xl font-bold text-white">{COMPANY_NAME}</span>
        </div>
        <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">Creating sustainable packaging solutions for a greener tomorrow</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm">
          <a href={`mailto:${siteInfo.contactEmail}`} className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group">
            <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
            {siteInfo.contactEmail}
          </a>
          <a href={`https://wa.me/${TARGET_WHATSAPP_NUMBER.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group">
            <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
            WhatsApp Support
          </a>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-sm text-gray-400 mb-2">© {new Date().getFullYear()} {COMPANY_NAME} • {WEBSITE_URL}</p>
        <p className="text-xs text-emerald-400 font-medium">Sustainable packaging solutions • Made in India</p>
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---
const Index: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    email: '', 
    phone: '', 
    pincode: '', 
    address: '', 
    businessType: '', 
    strawSizes: [], 
    message: '' 
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error' | 'webhook_error_csv_success'>('idle');
  
  useEffect(() => {
    document.title = `${COMPANY_NAME} - Premium Rice Straws | Free Samples Available`;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', `Get your free samples of ${COMPANY_NAME}'s premium, biodegradable rice straws. Made from natural ingredients. Sustainable packaging solutions for eco-conscious businesses.`);
  }, []);

  useEffect(() => {
    const { name, email, phone, pincode, address, businessType, strawSizes } = formData;
    const emailRegex = /^\S+@\S+\.\S+$/; 
    const phoneRegex = /^\+?[0-9\s-()]{7,15}$/;
    const pincodeRegex = /^[1-9][0-9]{5}$/;

    setIsFormValid(
      !!(name.trim().length > 1 &&
         emailRegex.test(email.trim()) &&
         phoneRegex.test(phone.trim()) &&
         pincodeRegex.test(pincode.trim()) &&
         address.trim().length > 5 &&
         businessType !== '' &&
         strawSizes.length > 0)
    );
  }, [formData]);

  const handleInputChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName?: keyof FormData,
    value?: string
  ) => {
    if (fieldName === 'strawSizes' && value !== undefined) {
      try { 
        const newSizes = JSON.parse(value) as string[];
        setFormData(prev => ({ ...prev, strawSizes: newSizes }));
      }
      catch (error) { 
        console.error("Error parsing strawSizes:", error); 
      }
    } else {
      const { name, value: inputValue } = e.target;
      setFormData(prev => ({ ...prev, [name]: inputValue }));
    }
    if (submissionStatus !== 'idle') setSubmissionStatus('idle');
  }, [submissionStatus]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;
    
    const businessTypeLabel = BUSINESS_TYPES.find(bt => bt.value === formData.businessType)?.label || formData.businessType;
    const tempSubmissionDataForMsg = {
      name: formData.name.trim(), 
      email: formData.email.trim(), 
      phone: formData.phone.trim(), 
      pincode: formData.pincode.trim(), 
      address: formData.address.trim(),
      businessType: businessTypeLabel, 
      strawSizes: formData.strawSizes.join(', '), 
      message: formData.message.trim() || 'N/A',
    };

    const whatsappMessage = `*${COMPANY_NAME} - Free Sample Request (Campaign)*\n\nName: ${tempSubmissionDataForMsg.name}\nEmail: ${tempSubmissionDataForMsg.email}\nPhone: ${tempSubmissionDataForMsg.phone}\nPincode: ${tempSubmissionDataForMsg.pincode}\nAddress: ${tempSubmissionDataForMsg.address}\nBusiness Type: ${tempSubmissionDataForMsg.businessType}\nStraw Sizes: ${tempSubmissionDataForMsg.strawSizes}\n${tempSubmissionDataForMsg.message && tempSubmissionDataForMsg.message !== 'N/A' ? `Message: ${tempSubmissionDataForMsg.message}` : ''}\n\nRequest from website: ${WEBSITE_URL}`;
    const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp first
    window.open(whatsappUrl, '_blank'); 

    setIsSubmitting(true); 
    setSubmissionStatus('idle');

    const submissionData = {
      name: formData.name.trim(), 
      email: formData.email.trim(), 
      phone: formData.phone.trim(), 
      pincode: formData.pincode.trim(), 
      address: formData.address.trim(),
      businessType: formData.businessType,
      strawSizes: formData.strawSizes.join(', '),
      message: formData.message.trim() || 'N/A',
      submittedAt: new Date().toISOString(), 
      source: WEBSITE_URL, 
      campaign: "Free Sample Request",
    };

    let webhookSuccess = false; 
    let csvFallbackUsed = false;

    // Try webhook submission
    if (DATA_SUBMISSION_WEBHOOK_URL && DATA_SUBMISSION_WEBHOOK_URL.trim() !== '') {
      try {
        console.log('Submitting to webhook:', DATA_SUBMISSION_WEBHOOK_URL);
        const response = await fetch(DATA_SUBMISSION_WEBHOOK_URL, { 
          method: 'POST', 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(submissionData),
          mode: 'cors'
        });
        
        if (response.ok) {
          webhookSuccess = true;
          console.log('Webhook submission successful');
          toast({
            title: "Success!",
            description: "Your sample request has been submitted successfully.",
          });
        } else {
          console.error('Webhook failed:', response.status);
          toast({
            title: "Partial Success",
            description: "Request sent via WhatsApp, but data recording had issues.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Webhook error:', error);
        toast({
          title: "WhatsApp Opened",
          description: "Please complete your request via WhatsApp.",
        });
      }
    }

    // CSV Fallback if webhook failed
    if (!webhookSuccess) {
      csvFallbackUsed = true;
      const headers = "Name,Email,Phone,Pincode,Address,BusinessType,StrawSizes,Message,SubmittedAt,Source,Campaign\n";
      const s = (str: string | undefined) => `"${(str || "").replace(/"/g, '""')}"`; 
      const row = `${s(submissionData.name)},${s(submissionData.email)},${s(submissionData.phone)},${s(submissionData.pincode)},${s(submissionData.address)},${s(submissionData.businessType)},${s(submissionData.strawSizes)},${s(submissionData.message)},${s(submissionData.submittedAt)},${s(submissionData.source)},${s(submissionData.campaign)}\n`;
      const csvContent = headers + row;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `RootWave_Sample_Request_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        csvFallbackUsed = false;
      }
    }

    setIsSubmitting(false);
    
    if (webhookSuccess) { 
      setSubmissionStatus('success'); 
      setFormData({ name: '', email: '', phone: '', pincode: '', address: '', businessType: '', strawSizes: [], message: '' }); 
    } else if (csvFallbackUsed) { 
      setSubmissionStatus('webhook_error_csv_success'); 
      setFormData({ name: '', email: '', phone: '', pincode: '', address: '', businessType: '', strawSizes: [], message: '' });
    } else {
      setSubmissionStatus('error');
    }
  }, [formData, isFormValid, isSubmitting]); 
  
  const scrollToSamples = useCallback(() => {
    document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased">
      <Header onCTAClick={scrollToSamples} />
      <main className="pt-16">
        <FreeBanner onCTAClick={scrollToSamples} />
        <HeroSection onCTAClick={scrollToSamples} />
        <ProductShowcase onCTAClick={scrollToSamples} />
        <BenefitsSection />
        <SampleForm 
          formData={formData} 
          isFormValid={isFormValid} 
          onInputChange={handleInputChange} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
          submissionStatus={submissionStatus}
        />
      </main>
      <Footer />
      <FloatingSampleButton onCTAClick={scrollToSamples} />
    </div>
  );
};

export default Index;
