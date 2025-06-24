import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { Shield, ArrowRight, Mail, CheckCircle, Phone, Gift, Star, Recycle, DivideIcon as LucideIcon, Menu, X, Award, Users, MapPin } from 'lucide-react';

// --- CONSTANTS & SITE CONFIG ---
const TARGET_WHATSAPP_NUMBER = '917983882050';
const COMPANY_NAME = "RootWave";
const WEBSITE_URL = "www.rootwave.org";

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

interface Statistic {
  id: string;
  value: string;
  label: string;
  icon: typeof LucideIcon;
}
// --- DATA ---
const siteInfo = {
  slogan: "Sip Sustainably. Live Responsibly.",
  websiteName: "RootWave",
  websiteUrl: "www.rootwave.org",
  brandIntro: "RootWave creates bio-based alternatives from agricultural rice waste, promoting a circular economy and a healthier planet.",
  logoPath: "/logo icon -svg-01.png",
  environmentalBenefits: [
    { 
      id: 'benefit-zero-waste', 
      icon: Recycle, 
      title: "Zero Waste Cycle", 
      desc: "Utilizes agricultural by-products, turning waste into value.",
      color: "emerald"
    },
    { 
      id: 'benefit-eco-friendly', 
      icon: Shield, 
      title: "Purely Eco-Friendly", 
      desc: "Crafted with no plastics or synthetic materials, kind to Earth.",
      color: "green"
    },
    { 
      id: 'benefit-biodegradable', 
      icon: Star, 
      title: "Rapidly Biodegradable", 
      desc: "Decomposes naturally in weeks, not centuries.",
      color: "yellow"
    },
    { 
      id: 'benefit-safe-vegan', 
      icon: Shield, 
      title: "Safe, Vegan & Edible", 
      desc: "Food-grade, gluten-free, cruelty-free, and even edible.",
      color: "blue"
    }
  ] as EnvironmentalBenefit[],
  productVariants: [
    { 
      id: 'prod-6.5mm', 
      size: '6.5mm', 
      use: 'Water, Juice, Tea, Soda', 
      icon: '💧', 
      image: '/1.png',
      description: 'Perfect for everyday beverages and light drinks'
    },
    { 
      id: 'prod-8mm', 
      size: '8mm', 
      use: 'Smoothies, Milkshakes', 
      icon: '🥤', 
      image: '/2.png',
      description: 'Ideal for medium-thick beverages and protein shakes'
    },
    { 
      id: 'prod-10mm', 
      size: '10mm', 
      use: 'Thick Shakes, Fruit Blends', 
      icon: '🍓', 
      image: '/3.png',
      description: 'Great for thick smoothies and fruit-based drinks'
    },
    { 
      id: 'prod-13mm', 
      size: '13mm', 
      use: 'Bubble Tea, Jelly Drinks', 
      icon: '🧋', 
      image: '/4.png',
      description: 'Perfect for bubble tea and drinks with toppings'
    }
  ] as ProductVariant[],
  statistics: [
    { id: 'stat-customers', value: '500+', label: 'Happy Customers', icon: Users },
    { id: 'stat-awards', value: '99%', label: 'Satisfaction Rate', icon: Award },
    { id: 'stat-locations', value: '25+', label: 'Cities Served', icon: MapPin },
    { id: 'stat-eco', value: '100K+', label: 'Plastic Straws Replaced', icon: Shield }
  ] as Statistic[],
  customization: {
    colors: "Multiple vibrant color variants available at no extra charge (White, Orange, Green, Black, Red).",
    pouch: "Custom-branded eco-pouches for bulk orders (Min: 30,000 pcs, Setup: ₹10,000)."
  },
  qualityControl: "Rigorous 4-stage quality assurance: Material Inspection, Manufacturing Control, Packaging Verification, Final Approval for perfection.",
  vsPlastic: "Plastic: Non-biodegradable (400+ yrs), fossil fuel-based, pollutes ecosystems. Our Straws: Biodegradable (weeks), plant-based, nourishes soil.",
  vsPaper: "Paper: Often soggy, impacts taste, may contain non-compostable coatings. Our Straws: Durable, neutral taste, 100% home compostable.",
  contactEmail: "info@rootwave.org",
};

const FORM_FIELDS = [
  { label: 'Name', name: 'name', type: 'text', placeholder: 'Your full name', autocomplete: 'name' },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com', autocomplete: 'email' },
  { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX', autocomplete: 'tel' },
] as const;

type FormData = { name: string; email: string; phone: string; message: string; };

// --- UI COMPONENTS ---

const Header: React.FC<{onCTAClick: () => void}> = ({ onCTAClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src={siteInfo.logoPath} 
            alt={`${COMPANY_NAME} Logo`} 
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-lg text-gray-800">{COMPANY_NAME}</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#products" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Products</a>
          <a href="#benefits" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Benefits</a>
          <a href="#samples" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Samples</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={onCTAClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            Free Samples
          </button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
          <nav className="px-4 py-4 space-y-3">
            <a href="#products" className="block text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
            <a href="#benefits" className="block text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Benefits</a>
            <a href="#samples" className="block text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Samples</a>
          </nav>
        </div>
      )}
    </header>
  );
};

const FreeBanner: React.FC<{onCTAClick: () => void}> = ({onCTAClick}) => (
  <div 
    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 text-center cursor-pointer hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
    onClick={onCTAClick}
  >
    <p className="flex items-center justify-center gap-2 text-sm font-semibold animate-pulse">
      <Gift className="h-4 w-4" />
      <span>🎉 Limited Time: Free Sample Campaign Active - Get Yours Now!</span>
    </p>
  </div>
);

const HeroSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => (
  <section className="relative pt-20 pb-20 min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
    </div>

    <div className="relative text-center px-4 max-w-4xl mx-auto z-10">
      <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-scaleIn border border-emerald-200">
        <Gift className="h-4 w-4" />
        <span>Free samples available nationwide</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInUp">
        {siteInfo.slogan}
      </h1>
      
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto animate-fadeInUp font-light" style={{animationDelay: '0.2s'}}>
        {siteInfo.brandIntro}
      </p>

      {/* Environmental benefits showcase */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
        {siteInfo.environmentalBenefits.map((benefit, index) => (
          <div key={benefit.id} className={`flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 animate-fadeInUp`} style={{animationDelay: `${0.4 + index * 0.1}s`}}>
            <div className={`w-12 h-12 bg-${benefit.color}-100 rounded-xl flex items-center justify-center mb-3`}>
              <benefit.icon className={`h-6 w-6 text-${benefit.color}-600`} />
            </div>
            <span className="text-sm font-semibold text-gray-800 text-center leading-tight">{benefit.title}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{animationDelay: '0.8s'}}>
        <button
          onClick={onCTAClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1"
        >
          <span>Request Free Samples</span>
          <ArrowRight className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-emerald-600 hover:text-emerald-700 font-semibold px-8 py-4 rounded-2xl transition-colors duration-300 border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
        >
          View Products
        </button>
      </div>
      
      <p className="text-sm text-gray-500 mt-4 animate-fadeInUp" style={{animationDelay: '1s'}}>
        No payment required • Free nationwide shipping • 48-hour dispatch
      </p>
    </div>
  </section>
);

// Statistics Section
const StatisticsSection: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {siteInfo.statistics.map((stat, index) => (
          <div key={stat.id} className={`text-center animate-fadeInUp`} style={{animationDelay: `${index * 0.1}s`}}>
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <stat.icon className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Product Card Component
interface ProductCardProps {
  product: ProductVariant;
  idx: number;
  onCTAClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, idx, onCTAClick }) => (
  <div 
    className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 animate-fadeInUp`}
    style={{ animationDelay: `${idx * 150}ms` }}
  >
    <div className="relative overflow-hidden">
      <img 
        src={product.image} 
        alt={`${product.size} ${siteInfo.websiteName} Rice Straw`} 
        loading="lazy" 
        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-emerald-600">
        {product.icon} {product.size}
      </div>
    </div>
    
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold mb-2 text-gray-900">{product.size} Rice Straw</h3>
      <p className="text-gray-600 text-sm mb-3 font-medium">{product.use}</p>
      <p className="text-gray-500 text-xs mb-6 leading-relaxed">{product.description}</p>
      
      <button 
        onClick={onCTAClick}
        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-md border border-emerald-200 hover:border-emerald-300"
      >
        Get FREE Sample
      </button>
    </div>
  </div>
));

// Product Showcase Section
const ProductShowcase: React.FC<{onCTAClick: () => void}> = ({ onCTAClick }) => (
  <section id="products" className="py-24 gradient-section">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">Perfect Size for Every Sip</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our diverse range ensures the ideal straw for any beverage. All available as <span className="font-bold text-emerald-600">complimentary {siteInfo.websiteName} samples</span>.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {siteInfo.productVariants.map((product, idx) => (
          <ProductCard key={product.id} product={product} idx={idx} onCTAClick={onCTAClick} />
        ))}
      </div>
      
      {/* Feature comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-3xl border border-emerald-100 shadow-lg">
          <h3 className="font-bold text-xl text-emerald-800 mb-4 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Customization & Quality
          </h3>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p><span className="font-semibold text-gray-900">Vibrant Colors:</span> {siteInfo.customization.colors}</p>
            <p><span className="font-semibold text-gray-900">Branded Eco-Pouches:</span> {siteInfo.customization.pouch}</p>
            <p><span className="font-semibold text-gray-900">Our Quality Promise:</span> {siteInfo.qualityControl}</p>
          </div>
        </div>
        
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

// Benefits Section
const BenefitsSection: React.FC = () => (
  <section id="benefits" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Why Choose RootWave?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the perfect blend of sustainability, functionality, and innovation with every sip.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {siteInfo.environmentalBenefits.map((benefit, index) => (
          <div key={benefit.id} className={`flex items-start gap-6 p-8 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-all duration-300 animate-slideInFromLeft`} style={{animationDelay: `${index * 0.2}s`}}>
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
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}> = ({ formData, isFormValid, onInputChange, onSubmit }) => (
  <section id="samples" className="py-24 gradient-section">
    <div className="max-w-lg mx-auto px-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float">
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

        {FORM_FIELDS.map(field => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
            <input
              type={field.type} 
              name={field.name} 
              id={field.name}
              value={formData[field.name as keyof FormData]}
              onChange={onInputChange} 
              required
              autoComplete={field.autocomplete}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm placeholder-gray-400 bg-gray-50 focus:bg-white"
              placeholder={field.placeholder}
            />
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
          />
        </div>
        
        <button
          type="submit" 
          disabled={!isFormValid}
          className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            isFormValid
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Send Sample Request</span>
          <CheckCircle className="h-4 w-4" />
        </button>
        
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          We'll contact you via WhatsApp to confirm delivery details within 24 hours
        </p>
      </form>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-6">
          <img 
            src={siteInfo.logoPath} 
            alt={`${COMPANY_NAME} Logo`} 
            className="h-12 w-12 object-contain mr-3"
          />
          <span className="text-2xl font-bold text-white">{COMPANY_NAME}</span>
        </div>
        
        <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          Creating sustainable packaging solutions for a greener tomorrow
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm">
          <a href={`mailto:${siteInfo.contactEmail}`} className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group">
            <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" /> 
            {siteInfo.contactEmail}
          </a>
          <a href={`https://wa.me/${TARGET_WHATSAPP_NUMBER.replace(/\D/g, '')}`} target="_blank\" rel="noopener noreferrer\" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group">
            <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" /> 
            WhatsApp Support
          </a>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-sm text-gray-400 mb-2">
          © {new Date().getFullYear()} {COMPANY_NAME} • {WEBSITE_URL}
        </p>
        <p className="text-xs text-emerald-400 font-medium">
          Sustainable packaging solutions • Made in India
        </p>
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    document.title = `${COMPANY_NAME} - Premium Rice Straws | Free Samples Available`;
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', `Get your free samples of ${COMPANY_NAME}'s premium, biodegradable rice straws. Made from natural ingredients. Sustainable packaging solutions for eco-conscious businesses.`);
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }
  }, []);

  useEffect(() => {
    const { name, email, phone } = formData;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\+?[0-9\s-()]{7,15}$/; 
    setIsFormValid(!!(name.trim().length > 1 && emailRegex.test(email) && phoneRegex.test(phone.trim())));
  }, [formData]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    const message = `*${COMPANY_NAME} - Free Sample Request (Campaign)*

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.message ? `Message: ${formData.message}` : ''}

Request from website: ${WEBSITE_URL}`;

    const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', email: '', phone: '', message: '' });
  }, [formData, isFormValid]);

  const scrollToSamples = useCallback(() => {
    const samplesSection = document.getElementById('samples');
    samplesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased">
      <Header onCTAClick={scrollToSamples} />
      
      <main>
        <FreeBanner onCTAClick={scrollToSamples} />
        <HeroSection onCTAClick={scrollToSamples} />
        <StatisticsSection />
        <ProductShowcase onCTAClick={scrollToSamples} />
        <BenefitsSection />
        <SampleForm
          formData={formData}
          isFormValid={isFormValid}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;