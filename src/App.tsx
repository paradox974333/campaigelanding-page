import React, { useState, useEffect } from 'react';
import { Leaf, Recycle, Shield, Award, ArrowRight, Phone, Mail, User, Package, ChevronDown, Zap, Star, ChevronsRight } from 'lucide-react';

// Data from your provided info (condensed for landing page)
const siteInfo = {
  slogan: "Sip Sustainably. Live Responsibly.",
  website: "www.rootwave.org",
  brandIntro: "RootWave creates bio-based alternatives from agricultural rice waste, promoting a circular economy.",
  materialCore: "Rice flour, tapioca starch, water. Agri-waste cleaned, ground, molded. 100% food-grade, edible, and biodegrades in weeks.",
  environmentalBenefits: [
    { icon: Recycle, title: "Zero Waste", desc: "Utilizes agricultural by-products." },
    { icon: Leaf, title: "Eco-Friendly", desc: "No plastics or synthetic materials." },
    { icon: Star, title: "Fully Biodegradable", desc: "Decomposes naturally." },
    { icon: Shield, title: "Safe & Vegan", desc: "Food-grade, gluten-free, cruelty-free." }
  ],
  productVariants: [
    { size: '6.5mm', use: 'Water, Juice, Tea, Soda', icon: '💧', price: '₹1.75', image: '1.png' }, // Placeholder
    { size: '8mm', use: 'Smoothies, Milkshakes', icon: '🥤', price: '₹2.20', image: '2.png' }, // Placeholder
    { size: '10mm', use: 'Thick Shakes, Fruit Blends', icon: '🍓', price: '₹2.99', image: '3.png' }, // Placeholder
    { size: '13mm', use: 'Bubble Tea, Jelly Drinks', icon: '🧋', price: '₹4.15', image: '4.png' } // Placeholder
  ],
  customization: {
    colors: "Multiple color variants available at no extra charge (White, Orange, Green, Black, Red).",
    pouch: "Custom-branded pouches for bulk orders (Min: 30,000 pcs, Setup: ₹10,000)."
  },
  qualityControl: "Rigorous 4-stage quality check: Material Inspection, Manufacturing Control, Packaging Verification, Final Approval.",
  vsPlastic: "Plastic: Non-biodegradable (400+ yrs), oil-based. Rice Straws: Biodegradable (weeks), plant-based.",
  vsPaper: "Paper: Soggy, often poor taste, may have coatings. Rice Straws: Durable, neutral taste, 100% compostable.",
  contactTeam: [
    { name: 'Girish Sp', role: 'CEO', email: 'info@rootwave.org', phone: '+91 77600 21026', icon: Award, color: 'green-500', iconBgTo: 'green-700' },
    { name: 'Arpan Tiwari', role: 'CEO', email: 'arpan@rootwave.org', phone: '+91 83195 45466', icon: Award, color: 'green-500', iconBgTo: 'green-700' },
    { name: 'Prateek P.', role: 'CEO & CMO', email: 'prateek@rootwave.org', phone: '+91 79838 82050', icon: Award, color: 'green-500', iconBgTo: 'green-700', highlight: true }
  ]
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  quantity: string;
  size: string;
  message: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', company: '', quantity: '', size: '6.5mm', message: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);
  useEffect(() => {
    const required = formData.name && formData.email && formData.phone && formData.quantity;
    setIsFormValid(!!required);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    const message = `🌾 *FREE RICE STRAW ORDER REQUEST*
👤 Name: ${formData.name} | Email: ${formData.email} | Phone: ${formData.phone} | Company: ${formData.company || 'N/A'}
📦 Quantity: ${formData.quantity} pcs | Size: ${formData.size} | Message: ${formData.message || 'N/A'}
*Request from RootWave Website*`;
    const whatsappUrl = `https://wa.me/917983882050?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`min-h-screen bg-white text-stone-900 font-sans antialiased overflow-x-hidden transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="#" className="flex items-center  group">
              <img src="logo icon -svg-01.png" alt="RootWave Logo" className="w-10 h-10" />
              <span className="text-xl font-semibold tracking-tight text-stone-800 group-hover:text-green-600 transition-colors">RootWave</span>
            </a>
            <div className="flex items-center space-x-4 sm:space-x-8">
              {['Benefits', 'Products', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hidden sm:block text-[15px] font-medium text-stone-600 hover:text-green-600 transition-colors duration-200 relative group">
                  {item}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <a 
                href="#order"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-[15px] font-semibold transition-all duration-300 shadow-lg hover:shadow-green-600/50 transform hover:scale-105"
              >
                Get Free rice straw now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`relative pt-32 md:pt-40 pb-28 md:pb-36 overflow-hidden`}>
        
             <img src="/DSC03065.JPG" alt="Natural background" className="absolute inset-0 w-full h-full object-cover opacity-100"/> 
         
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 via-emerald-50/50 to-teal-50/30"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-green-200/30 rounded-full filter blur-3xl animate-pulse-slow opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-emerald-200/30 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000 opacity-50"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tighter text-stone-900 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                {siteInfo.slogan.split('.')[0]}.
              </span>
              <span className="block">{siteInfo.slogan.split('.')[1].trim()}.</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-stone-700 font-light mb-12 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {siteInfo.brandIntro} Experience the future of eco-friendly sipping.
              Get your <span className="font-semibold text-green-600">FREE samples</span> today.
            </p>
            
            <a 
              href="#order"
              className={`group inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-700 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:-translate-y-1.5 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            >
              Claim Your Free Rice straw Boxes
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
        </div>
      </section>

      {/* Environmental Benefits Section */}
      <section id="benefits" className="py-20 md:py-28 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 leading-tight">Why RootWave <br className="hidden md:block" /> Rice Straws?</h2>
              <p className="text-lg md:text-xl text-stone-700 font-light mb-8 max-w-lg">
                A simple choice with a profound impact on our planet and your experience. Crafted for sustainability without compromising quality.
              </p>
              <div className="mt-8 text-md text-stone-700 bg-green-50/70 p-6 rounded-xl border border-green-200/70">
                <p className="font-medium mb-1">Our rice straws are crafted from {siteInfo.materialCore.split('.')[0].toLowerCase()}, agricultural waste, and water.</p>
                <p className="text-sm">{siteInfo.materialCore.split('.').slice(1).join('.').trim()}</p>
              </div>
            </div>
            <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
               {/* Replace with a high-quality lifestyle image of straws */}
              <img src="DSC03089.JPG" alt="RootWave rice straws in use" className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-xl border border-stone-200/50">
                  <Leaf className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {siteInfo.environmentalBenefits.map((benefit, idx) => (
              <div key={idx} className={`bg-gradient-to-br from-stone-50 to-stone-100/50 p-6 rounded-2xl shadow-lg border border-stone-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 delay-${idx * 150} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mb-4 shadow-md">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1.5 text-stone-800">{benefit.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Variants Section */}
      <section id="products" className="py-20 md:py-28 bg-gradient-to-b from-green-50/50 via-emerald-50/40 to-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-stone-900 tracking-tight">Perfect Size for Every Sip</h2>
            <p className="text-lg md:text-xl text-stone-700 font-light max-w-3xl mx-auto">
              Our range ensures the ideal straw for any beverage. All available as <span className="font-semibold text-green-600"> Get FREE Rice straw </span>.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteInfo.productVariants.map((product, idx) => (
              <div key={product.size} className={`group bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-stone-200/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 delay-${idx * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <img src={product.image} alt={`${product.size} RootWave Rice Straw`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-1.5 text-stone-800">{product.size}</h3>
                  <p className="text-stone-600 text-md mb-4 h-12 flex items-center justify-center">{product.use}</p>
                  <a href="#order" className="inline-block text-sm font-semibold bg-green-100 text-green-700 px-6 py-2.5 rounded-lg shadow-sm hover:bg-green-200 hover:text-green-800 transition-colors">
                     get FREE Rice straws
                  </a>
                </div>
              </div>
            ))}
          </div>
           <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-8 text-sm text-stone-700">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-stone-200/50 shadow-xl">
                <h4 className="font-semibold text-xl text-green-600 mb-3">Customization & Quality</h4>
                <p className="mb-2"><strong className="text-stone-800">Colors:</strong> {siteInfo.customization.colors}</p>
                <p className="mb-3"><strong className="text-stone-800">Branded Pouches:</strong> {siteInfo.customization.pouch}</p>
                <p><strong className="text-stone-800">Our Promise:</strong> {siteInfo.qualityControl}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-stone-200/50 shadow-xl">
                <h4 className="font-semibold text-xl text-green-600 mb-3">The Superior Choice</h4>
                <p className="mb-2"><strong className="text-stone-800">vs. Plastic:</strong> {siteInfo.vsPlastic}</p>
                <p><strong className="text-stone-800">vs. Paper:</strong> {siteInfo.vsPaper}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="py-20 md:py-28 bg-white">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">Request Your FREE Rice straw Boxes</h2>
            <p className="text-lg md:text-xl text-stone-700 font-light">
              Provide your details, and we'll connect via WhatsApp to arrange your complimentary pack.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-stone-50/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-stone-200/60">
            {/* Form fields styling adjusted for sleekness */}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6 mb-6">
              {[
                { label: 'Full Name *', name: 'name', type: 'text', placeholder: 'Your Name' },
                { label: 'Email Address *', name: 'email', type: 'email', placeholder: 'you@example.com' },
                { label: 'Phone Number *', name: 'phone', type: 'tel', placeholder: '+91 00000 00000' },
                { label: 'Company (Optional)', name: 'company', type: 'text', placeholder: 'Your Organization' }
              ].map(field => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-[14px] font-medium text-stone-700 mb-1.5">{field.label}</label>
                  <input
                    type={field.type} name={field.name} id={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange} required={field.label.includes('*')}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500/70 focus:border-green-500 transition-all duration-200 bg-white text-[15px] placeholder-stone-400 shadow-sm"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6 mb-6">
              <div>
                <label htmlFor="quantity" className="block text-[14px] font-medium text-stone-700 mb-1.5">Sample Quantity *</label>
                <input
                  type="number" name="quantity" id="quantity"
                  value={formData.quantity} onChange={handleInputChange}
                  required min="1" placeholder="e.g., 50"
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500/70 focus:border-green-500 transition-all duration-200 bg-white text-[15px] placeholder-stone-400 shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="size" className="block text-[14px] font-medium text-stone-700 mb-1.5">Preferred Size</label>
                <div className="relative">
                  <select
                    name="size" id="size" value={formData.size} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500/70 focus:border-green-500 transition-all duration-200 appearance-none bg-white text-[15px] shadow-sm"
                  >
                    {siteInfo.productVariants.map(p => <option key={p.size} value={p.size}>{p.size} - {p.use.split(',')[0]}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-[14px] font-medium text-stone-700 mb-1.5">Message (Optional)</label>
              <textarea
                name="message" id="message" value={formData.message} onChange={handleInputChange}
                rows={3} placeholder="Any specific requirements or questions?"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500/70 focus:border-green-500 transition-all duration-200 resize-none bg-white text-[15px] placeholder-stone-400 shadow-sm"
              />
            </div>
            <button
              type="submit" disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform ${
                isFormValid
                  ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:-translate-y-1'
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              Send Request via WhatsApp
              {isFormValid && <ChevronsRight className="ml-2.5 h-5 w-5" />}
            </button>
            <p className="text-xs text-stone-500 text-center mt-5">
              We respect your privacy. Contact via WhatsApp for order confirmation.
            </p>
          </form>
        </div>
      </section>

      {/* Contact Section */}
       <section id="contact" className="py-20 md:py-28 bg-gradient-to-br from-stone-50/70 via-stone-100/60 to-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight text-stone-900">Meet the <span className="text-green-600">RootWave</span> Team</h2>
            <p className="text-lg md:text-xl text-stone-700 font-light">
              Passionate about sustainability and ready to assist you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {siteInfo.contactTeam.map(contact => (
              <div key={contact.name} className={`group bg-white/90 backdrop-blur-xl text-center p-8 rounded-2xl shadow-xl border transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${contact.highlight ? 'border-green-300/80 hover:border-green-400' : 'border-stone-200/60 hover:border-stone-300'}`}>
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-${contact.color} to-${contact.iconBgTo} rounded-full mb-8 shadow-xl group-hover:scale-105 transition-transform`}>
                  <contact.icon className="h-9 w-9 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-1.5 text-stone-900">{contact.name}</h3>
                <p className="text-stone-500 text-sm mb-6 font-medium">{contact.role}</p>
                <div className="space-y-3 text-sm">
                  <a href={`mailto:${contact.email}`} className="flex items-center justify-center space-x-2.5 text-stone-700 hover:text-green-600 transition-colors group/link">
                    <Mail className="h-5 w-5 text-stone-500 group-hover/link:text-green-600 transition-colors" />
                    <span className="font-medium tracking-tight">{contact.email}</span>
                  </a>
                  <a href={`https://wa.me/${contact.phone.replace(/\s|\+/g, '')}`} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center space-x-2.5 text-stone-700 hover:text-green-600 transition-colors group/link ${contact.highlight ? 'font-semibold' : ''}`}>
                    <Phone className="h-5 w-5 text-stone-500 group-hover/link:text-green-600 transition-colors" />
                    <span className="font-medium tracking-tight">{contact.phone} (WA)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-5">
             
            <a href="#" className="flex items-center  group">
              <img src="logo icon -svg-01.png" alt="RootWave Logo" className="w-10 h-10" />
              <span className="text-xl font-semibold tracking-tight text-white-800 group-hover:text-green-600 transition-colors">RootWave</span>
            </a>
          </div>
          <p className="text-lg text-stone-300 font-light mb-8">{siteInfo.slogan}</p>
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} RootWave | <a href={`http://${siteInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">{siteInfo.website}</a> | All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;