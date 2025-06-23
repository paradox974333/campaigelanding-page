import React, { useState, useEffect, useCallback, useRef, ChangeEvent, FormEvent } from 'react';
import { Leaf, Shield, ArrowRight, Mail, Menu, X, CheckCircle, Phone, Gift } from 'lucide-react';

// --- CONSTANTS & SITE CONFIG ---
const TARGET_WHATSAPP_NUMBER = '917983882050'; // Replace with your WhatsApp number
const COMPANY_NAME = "RootWave";
const WEBSITE_URL = "www.rootwave.org"; // Replace with your actual domain

// --- DATA ---
interface ProductVariant {
  id: string;
  size: string;
  use: string;
  image: string;
}

const siteInfo = {
  slogan: "FREE Rice Straws! Sip Sustainably.",
  heroIntro: `${COMPANY_NAME} is GIVING AWAY FREE SAMPLES of our premium, eco-conscious rice straws! Crafted from agricultural waste, designed for a better planet and a refined experience. Claim yours today!`,

  difference: {
    title: "The Clear Choice for a Conscious Lifestyle.",
    materialInfo: "Our straws are meticulously developed from rice flour and tapioca starch – 100% natural, plant-based ingredients.",
    keyBenefits: [
      { id: 'b1', icon: Leaf, text: "Truly Biodegradable: Decomposes naturally in weeks, not centuries." },
      { id: 'b2', icon: Shield, text: "Safe & Edible: Food-grade, gluten-free, and even pleasantly edible." },
    ],
  },

  productVariants: [
    { id: 'prod-6.5mm', size: '6.5mm', use: 'Water, Juice, Tea, Soda', image: '/1.png' }, // Ensure images are in /public
    { id: 'prod-8mm', size: '8mm', use: 'Smoothies, Milkshakes', image: '/2.png' },
    { id: 'prod-10mm', size: '10mm', use: 'Thick Shakes, Fruit Blends', image: '/3.png' },
    { id: 'prod-13mm', size: '13mm', use: 'Bubble Tea, Jelly Drinks', image: '/4.png' }
  ] as ProductVariant[],

  ourStrawsTitle: "Versatile Sizes for Every Sip",
  ourStrawsSubtitle: "Find the perfect RootWave straw for any beverage. All sizes are part of our FREE sample campaign – request yours now!",

  form: {
    title: "Get Your FREE RootWave Rice Straws!",
    subtitle: "Yes, they're really free! Provide your details, and we'll connect via WhatsApp to send your complimentary samples.",
  },

  contactEmail: "info@rootwave.org", // Replace with your email
  logoPath: "/logo icon -svg-01.png", // Ensure logo is in /public and high-quality
  heroImage: "/DSC03065.JPG", // Ensure hero image is in /public and high-quality
  lifestyleImage: "/DSC03089.JPG", // Ensure lifestyle image is in /public and high-quality
};

const FORM_FIELDS = [
  { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your Name' },
  { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
  { label: 'Phone (for WhatsApp)', name: 'phone', type: 'tel', placeholder: '+91 XXXX XXXX' },
] as const;

type FormData = { name: string; email: string; phone: string; message: string; };

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

// --- UI COMPONENTS ---

const Header: React.FC<{
  onCTAClick: () => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  menuButtonRef: React.RefObject<HTMLButtonElement>
}> = ({ onCTAClick, onMobileMenuToggle, isMobileMenuOpen, menuButtonRef }) => (
  <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg shadow-md"> {/* Subtle shadow for definition */}
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
      <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="flex items-center space-x-2.5 group">
        <img src={siteInfo.logoPath} alt={`${COMPANY_NAME} Logo`} className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105 duration-300" />
        <span className="font-bold text-xl text-emerald-700 tracking-tight group-hover:text-emerald-600 transition-colors duration-300 hidden sm:inline">
          {COMPANY_NAME}
        </span>
      </a>
      <div className="hidden md:block">
        <button
          onClick={onCTAClick}
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white px-7 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          Get Free Samples
        </button>
      </div>
      <div className="md:hidden">
        <button
          ref={menuButtonRef}
          onClick={onMobileMenuToggle}
          className="text-slate-700 hover:text-emerald-600 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>
    </div>
    {isMobileMenuOpen && (
      <div className="md:hidden bg-white shadow-lg absolute w-full border-t border-slate-200 py-4 px-6">
        <button
          onClick={() => { onCTAClick(); onMobileMenuToggle(); }}
          className="w-full bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Get Free Samples
        </button>
      </div>
    )}
  </header>
);

const CampaignHighlightBanner: React.FC<{onCTAClick: () => void}> = ({onCTAClick}) => (
  <div 
    className="bg-emerald-50 border-b-2 border-t border-emerald-200 text-emerald-800 py-3.5 px-4 sm:px-6 text-center cursor-pointer hover:bg-emerald-100 transition-colors duration-300"
    onClick={onCTAClick}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && onCTAClick()}
    aria-label="Click to claim your free samples"
  >
    <p className="flex items-center justify-center gap-2 flex-wrap max-w-3xl mx-auto">
      <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 flex-shrink-0" />
      <span className="text-sm sm:text-base leading-tight font-medium">
        LIMITED TIME: We're Giving Away <strong className="font-semibold text-emerald-600 underline decoration-wavy decoration-emerald-400 decoration-2">FREE Rice Straw Samples!</strong> Click to claim.
      </span>
      <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 flex-shrink-0 hidden xs:inline-block" />
    </p>
  </div>
);

const HeroSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => (
  <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 text-center bg-slate-50 overflow-hidden">
    <div className="absolute inset-0">
        <img
            src={siteInfo.heroImage}
            alt="Sustainable RootWave straws in use"
            className="w-full h-full object-cover opacity-20 md:opacity-25" // Adjust opacity based on image
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
    </div>
    <div className="relative max-w-3xl mx-auto px-6 z-10">
      <h1 className="text-4xl sm:text-5xl md:text-[3.6rem] font-bold text-slate-800 mb-6 !leading-tight tracking-tight">
        {siteInfo.slogan}
      </h1>
      <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-xl mx-auto leading-relaxed">
        {siteInfo.heroIntro}
      </p>
      <button
        onClick={onCTAClick}
        className="bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
      >
        Request Your Free Samples <ArrowRight className="inline-block ml-2.5 h-5 w-5" />
      </button>
    </div>
  </section>
);

const DifferenceAndProductsSection: React.FC<{onCTAClick: () => void}> = ({onCTAClick}) => (
  <section id="difference" className="py-20 md:py-28 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 tracking-tight">
            {siteInfo.difference.title}
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            {siteInfo.difference.materialInfo}
          </p>
          <div className="space-y-6">
            {siteInfo.difference.keyBenefits.map(benefit => (
              <div key={benefit.id} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-4 shadow-sm">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <p className="text-md md:text-lg text-slate-700">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-w-4 aspect-h-3 md:aspect-w-1 md:aspect-h-1 rounded-xl overflow-hidden shadow-xl group">
            <img
                src={siteInfo.lifestyleImage}
                alt="RootWave straws in an elegant lifestyle setting"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
          {siteInfo.ourStrawsTitle}
        </h3>
        <p className="text-lg text-slate-600 mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed">
          {siteInfo.ourStrawsSubtitle}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-8">
          {siteInfo.productVariants.map(product => (
            <div key={product.id} className="bg-slate-50 p-5 rounded-xl shadow-md group hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col items-center hover:scale-[1.03]">
              <div className="w-full aspect-[3/4] mb-4 rounded-md overflow-hidden bg-white flex items-center justify-center">
                <img
                    src={product.image}
                    alt={`${product.size} RootWave Straw`}
                    className="w-full h-auto max-h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-semibold text-slate-700 text-base md:text-lg mb-1">{product.size}</h4>
              <p className="text-xs sm:text-sm text-slate-500 text-center h-10 leading-tight">{product.use.split(',')[0]}</p>
            </div>
          ))}
        </div>
        <button
            onClick={onCTAClick}
            className="mt-12 bg-transparent hover:bg-emerald-50 text-emerald-600 font-semibold py-3.5 px-8 border-2 border-emerald-500 hover:border-emerald-600 hover:text-emerald-700 rounded-lg transition-all duration-300 ease-in-out inline-flex items-center group focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 shadow-sm hover:shadow-md"
        >
            Claim Your FREE Sample Pack <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  </section>
);

const SampleFormSection: React.FC<{
  formData: FormData;
  isFormValid: boolean;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}> = ({ formData, isFormValid, onInputChange, onSubmit }) => (
  <section id="samples" className="py-20 md:py-28 bg-slate-100">
    <div className="max-w-xl mx-auto px-6">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 tracking-tight">{siteInfo.form.title}</h2>
        <p className="text-lg text-slate-600 leading-relaxed">{siteInfo.form.subtitle}</p>
      </div>
      <form onSubmit={onSubmit} className="bg-white p-8 sm:p-10 rounded-xl shadow-xl space-y-6">
        {FORM_FIELDS.map(field => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
            <input
              type={field.type} name={field.name} id={field.name}
              value={formData[field.name as keyof FormData]}
              onChange={onInputChange} required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ease-in-out text-base placeholder-slate-400 shadow-sm"
              placeholder={field.placeholder}
            />
          </div>
        ))}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message (Optional)</label>
          <textarea
            name="message" id="message" value={formData.message} onChange={onInputChange}
            rows={3} placeholder="Any specific notes or questions?"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ease-in-out resize-none text-base placeholder-slate-400 shadow-sm"
          />
        </div>
        <button
          type="submit" disabled={!isFormValid}
          className={`w-full py-3.5 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out flex items-center justify-center transform focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isFormValid
              ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white hover:from-emerald-600 hover:to-emerald-800 shadow-lg hover:shadow-xl hover:scale-[1.02] focus-visible:ring-emerald-500'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-md'
          }`}
        >
          Send My Free Sample Request <CheckCircle className="ml-2.5 h-5 w-5" />
        </button>
      </form>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-800 text-slate-300 py-12 md:py-16">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="inline-block mb-6 group">
        <img src={siteInfo.logoPath} alt={`${COMPANY_NAME} Logo`} className="h-10 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      </a>
      <p className="text-sm mb-4 text-slate-400"> {/* Slightly softer text color */}
        © {new Date().getFullYear()} {COMPANY_NAME}. All Rights Reserved. <br className="sm:hidden"/> {WEBSITE_URL.replace(/^https?:\/\//, '')}
      </p>
      <div className="text-sm space-y-2 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center items-center">
        <a href={`mailto:${siteInfo.contactEmail}`} className="hover:text-emerald-400 transition-colors duration-300 inline-flex items-center">
            <Mail className="h-4 w-4 mr-1.5"/> {siteInfo.contactEmail}
        </a>
        {TARGET_WHATSAPP_NUMBER && (
            <a href={`https://wa.me/${TARGET_WHATSAPP_NUMBER.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors duration-300 inline-flex items-center">
                <Phone className="h-4 w-4 mr-1.5"/> WhatsApp Inquiry
            </a>
        )}
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageVisible(true), 100);
    document.documentElement.lang = 'en';
    document.title = `FREE ${COMPANY_NAME} Rice Straws | Eco-Friendly Samples`;
    setMetaTag('description', `Claim your FREE samples of ${COMPANY_NAME}'s premium, eco-conscious rice straws. Biodegradable, edible, and perfect for sustainable sipping. Request yours today!`);
    setMetaTag('keywords', `free rice straws, free samples, biodegradable straws, eco-friendly, sustainable, ${COMPANY_NAME}, premium straws, rice flour straws, edible straws`);
    setMetaTag('og:title', `FREE ${COMPANY_NAME} Rice Straws | Claim Your Samples!`, true);
    setMetaTag('og:description', `Get your FREE samples of ${COMPANY_NAME}'s 100% natural, biodegradable rice straws. ${siteInfo.heroIntro}`, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', `https://${WEBSITE_URL}`, true); // Assumes HTTPS
    setMetaTag('og:image', `https://${WEBSITE_URL}${siteInfo.heroImage}`, true); // Ensure image path is absolute and publicly accessible for OG tags

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const { name, email, phone } = formData;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\+?[0-9\s-()]{7,15}$/;
    setIsFormValid(!!(name.trim().length > 1 && emailRegex.test(email) && phoneRegex.test(phone.trim())));
  }, [formData]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
        document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    const message = `🌾 *${COMPANY_NAME} FREE SAMPLE REQUEST*
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
${formData.message ? `📝 Note: ${formData.message}` : ''}
*Sent from ${COMPANY_NAME} Website (${WEBSITE_URL}) - FREE Sample Campaign*`;
    const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', email: '', phone: '', message: '' });
  }, [formData, isFormValid]);

  const handleMobileMenuToggle = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  const scrollToSamples = useCallback(() => {
    const samplesSection = document.getElementById('samples');
    samplesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if(isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [isMobileMenuOpen]);

  return (
    <div className={`min-h-screen bg-white text-slate-800 font-sans antialiased transition-opacity duration-700 ease-in-out ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header
        onCTAClick={scrollToSamples}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
        menuButtonRef={menuButtonRef}
      />
      <main className="pt-20"> {/* Account for fixed header height (h-20 = 5rem = 80px) */}
        <CampaignHighlightBanner onCTAClick={scrollToSamples} />
        <HeroSection onCTAClick={scrollToSamples} />
        <DifferenceAndProductsSection onCTAClick={scrollToSamples} />
        <SampleFormSection
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