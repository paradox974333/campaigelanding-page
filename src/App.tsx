import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { Leaf, Shield, ArrowRight, Mail, CheckCircle, Phone, Gift, Star } from 'lucide-react';

// --- CONSTANTS & SITE CONFIG ---
const TARGET_WHATSAPP_NUMBER = '917983882050';
const COMPANY_NAME = "RootWave";
const WEBSITE_URL = "www.rootwave.org";

// --- DATA ---
const siteInfo = {
  slogan: `${COMPANY_NAME}: Premium Rice Straws`,
  tagline: "Sustainable • Biodegradable • Edible",
  heroIntro: "Made from natural rice flour and tapioca starch, our straws are perfect for eco-conscious businesses and individuals embracing sustainability.",
  
  benefits: [
    { icon: Leaf, text: "Biodegrades naturally" },
    { icon: Shield, text: "Food-safe & edible" },
    { icon: Star, text: "Premium quality" }
  ],

  productSizes: ['6.5mm', '8mm', '10mm', '13mm'],
  
  contactEmail: "info@rootwave.org",
  logoPath: "/logo icon -svg-01.png", // Ensure this path is correct in your public folder
  heroImage: "/DSC03065.JPG", // Ensure this path is correct in your public folder
};

const FORM_FIELDS = [
  { label: 'Name', name: 'name', type: 'text', placeholder: 'Your full name' },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
  { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
] as const;

type FormData = { name: string; email: string; phone: string; message: string; };

// --- UI COMPONENTS ---

const Header: React.FC<{onCTAClick: () => void}> = ({ onCTAClick }) => (
  <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={siteInfo.logoPath} alt={`${COMPANY_NAME} Logo`} className="h-8 w-auto" />
        {/* MODIFIED: Company name now visible on mobile with adjusted font size */}
        <span className="font-semibold text-base sm:text-lg text-gray-800">{COMPANY_NAME}</span>
      </div>
      <button
        onClick={onCTAClick}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
      >
        Free Samples
      </button>
    </div>
  </header>
);

const FreeBanner: React.FC<{onCTAClick: () => void}> = ({onCTAClick}) => (
  <div 
    className="bg-emerald-50 border-b border-emerald-100 text-emerald-800 py-3 px-4 text-center cursor-pointer hover:bg-emerald-100 transition-colors duration-200"
    onClick={onCTAClick}
  >
    <p className="flex items-center justify-center gap-2 text-sm font-medium">
      <Gift className="h-4 w-4" />
      <span>Limited time: Free sample campaign active</span>
    </p>
  </div>
);

const HeroSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => (
  <section className="relative pt-20 pb-16 min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={siteInfo.heroImage}
        alt="Sustainable rice straws"
        className="w-full h-full object-cover opacity-10"
      />
    </div>
    
    <div className="relative text-center px-4 max-w-2xl mx-auto z-10">
      <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
        <Gift className="h-3 w-3" />
        <span>Free samples available</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
        {siteInfo.slogan}
      </h1>
      
      <p className="text-lg sm:text-xl text-emerald-600 font-medium mb-6">
        {siteInfo.tagline}
      </p>
      
      <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
        {siteInfo.heroIntro}
      </p>

      <div className="flex justify-center gap-6 sm:gap-8 mb-8">
        {siteInfo.benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-2">
              <benefit.icon className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-xs sm:text-sm text-gray-600 text-center font-medium">{benefit.text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onCTAClick}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-base font-semibold transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
      >
        <span>Request Free Samples</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      
      <p className="text-xs text-gray-500 mt-3">
        No payment required • Free shipping
      </p>
    </div>
  </section>
);

const ProductShowcase: React.FC<{onCTAClick: () => void}> = ({onCTAClick}) => (
  <section className="py-16 bg-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Available Sizes
      </h2>
      <p className="text-base sm:text-lg text-gray-600 mb-10">
        Perfect for any beverage - all sizes included in sample pack
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {siteInfo.productSizes.map((size, index) => (
          <div key={size} className="bg-gray-50 p-4 sm:p-6 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
            <div className="w-16 h-20 bg-gradient-to-b from-amber-200 to-amber-300 rounded-xl mx-auto mb-4 flex items-center justify-center relative overflow-hidden">
              <div 
                className="bg-amber-600 rounded-full"
                style={{
                  width: `${4 + index * 1.5}px`,
                  height: '60px'
                }}
              />
            </div>
            <p className="font-semibold text-gray-800 text-sm sm:text-base">{size}</p>
            <p className="text-emerald-600 font-medium text-xs sm:text-sm mt-1">Included</p>
          </div>
        ))}
      </div>
      
      <div className="bg-emerald-50 p-6 sm:p-8 rounded-2xl border border-emerald-100">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Complete Sample Pack</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4">All 4 sizes • Free shipping • No commitment</p>
        <button
          onClick={onCTAClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 inline-flex items-center gap-2"
        >
          <Gift className="h-4 w-4" />
          <span>Get Sample Pack</span>
        </button>
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
  <section id="samples" className="py-16 bg-gray-50">
    <div className="max-w-md mx-auto px-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Gift className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Request Free Samples</h2>
        <p className="text-sm sm:text-base text-gray-600">We'll send you a complete sample pack at no cost</p>
      </div>
      
      <form onSubmit={onSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5">
        <div className="text-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-emerald-700 font-medium text-sm">✓ Free campaign active - No payment required</p>
        </div>

        {FORM_FIELDS.map(field => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <input
              type={field.type} name={field.name} id={field.name}
              value={formData[field.name as keyof FormData]}
              onChange={onInputChange} required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 text-sm placeholder-gray-400"
              placeholder={field.placeholder}
            />
          </div>
        ))}
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
          <textarea
            name="message" id="message" value={formData.message} onChange={onInputChange}
            rows={3} placeholder="Any specific requirements?"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-none text-sm placeholder-gray-400"
          />
        </div>
        
        <button
          type="submit" disabled={!isFormValid}
          className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 ${
            isFormValid
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Send Sample Request</span>
          <CheckCircle className="h-4 w-4" />
        </button>
        
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          We'll contact you via WhatsApp to confirm delivery details
        </p>
      </form>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <div className="flex justify-center items-center mb-6">
        <img src={siteInfo.logoPath} alt={`${COMPANY_NAME} Logo`} className="h-8 w-auto opacity-70" />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 text-sm">
        <a href={`mailto:${siteInfo.contactEmail}`} className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2">
          <Mail className="h-4 w-4"/> {siteInfo.contactEmail}
        </a>
        <a href={`https://wa.me/${TARGET_WHATSAPP_NUMBER.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2">
          <Phone className="h-4 w-4"/> WhatsApp
        </a>
      </div>
      
      <div className="border-t border-gray-800 pt-6">
        <p className="text-xs text-gray-400 mb-2">
          © {new Date().getFullYear()} {COMPANY_NAME} • {WEBSITE_URL}
        </p>
        <p className="text-xs text-emerald-400">
          Sustainable packaging solutions
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
    document.title = `${COMPANY_NAME} - Premium Rice Straws | Free Samples`;
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
        <ProductShowcase onCTAClick={scrollToSamples} />
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