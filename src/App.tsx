import React, { useState, useEffect } from 'react';
import { Leaf, Droplets, Recycle, Heart, ArrowRight, Check, Phone, Mail, User, Package, ChevronDown, Star, Shield, Award, Zap, VolumeX, Volume2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  quantity: string;
  size: string;
  message: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    size: '6.5mm',
    message: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // State for video mute status

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const required = formData.name && formData.email && formData.phone && formData.quantity;
    setIsFormValid(!!required);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle video click and toggle audio
  const handleVideoClick = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (video.muted) {
        video.muted = false;
        setIsMuted(false);
        video.play().catch(error => console.error("Video play failed:", error));
      } else {
        video.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const message = `🌾 *FREE RICE STRAW ORDER REQUEST*

👤 *Customer Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'Not specified'}

📦 *Order Details:*
Quantity: ${formData.quantity} pieces
Size: ${formData.size}
Message: ${formData.message || 'No additional message'}

*This is a request for FREE rice straws from RootWave.*`;

    const whatsappUrl = `https://wa.me/917983882050?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const products = [
    { size: '6.5mm', use: 'Water, juice, tea, soda', description: 'Perfect for thin beverages', originalPrice: '₹1.75', icon: '💧' },
    { size: '8mm', use: 'Smoothies, milkshakes', description: 'Ideal for medium-thick drinks', originalPrice: '₹2.20', icon: '🥤' },
    { size: '10mm', use: 'Thick milkshakes, fruit smoothies', description: 'Great for chunky beverages', originalPrice: '₹2.99', icon: '🍓' },
    { size: '13mm', use: 'Bubble tea, jelly drinks', description: 'Wide enough for pearls', originalPrice: '₹4.15', icon: '🧋' }
  ];

  const stats = [
    { value: '400+', label: 'Years plastic takes to decompose', icon: Recycle, color: 'from-red-400 to-red-600' },
    { value: '2-3', label: 'Weeks for rice straws to biodegrade', icon: Leaf, color: 'from-green-400 to-green-600' },
    { value: '100%', label: 'Made from agricultural waste', icon: Droplets, color: 'from-blue-400 to-blue-600' },
    { value: '0', label: 'Harmful chemicals used', icon: Heart, color: 'from-pink-400 to-pink-600' }
  ];

  const features = [
    { icon: Shield, title: 'Food Grade Safe', desc: '100% safe to chew or eat' },
    { icon: Award, title: 'Premium Quality', desc: 'Rigorous 4-stage quality control' },
    { icon: Zap, title: 'Instant Biodegradable', desc: 'Decomposes in 2-3 weeks naturally' },
    { icon: Star, title: 'Zero Waste', desc: 'Made from agricultural by-products' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left side: Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-2xl">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">RootWave</span>
                <div className="text-xs text-gray-500 font-medium">Sip Sustainably</div>
              </div>
            </div>

            {/* Right side: Nav links and Audio Button */}
            <div className="flex items-center space-x-6"> {/* Overall spacing for right-side items */}
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-gray-600 hover:text-green-500 transition-all duration-300 font-medium relative group">
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#products" className="text-gray-600 hover:text-green-500 transition-all duration-300 font-medium relative group">
                  Products
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#order" className="text-gray-600 hover:text-green-500 transition-all duration-300 font-medium relative group">
                  Order
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#contact" className="text-gray-600 hover:text-green-500 transition-all duration-300 font-medium relative group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>

              {/* Audio Control Button - ALWAYS VISIBLE */}
              <button
                onClick={handleVideoClick}
                className="text-gray-600 hover:text-green-500 p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                title={isMuted ? "Unmute Video" : "Mute Video"}
                aria-label={isMuted ? "Unmute video background" : "Mute video background"}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" />

          {/* Background Video with Audio */}
          <video
            id="hero-video"
            autoPlay
            loop
            playsInline
            muted // Initially muted for autoplay compliance
            className="absolute inset-0 w-full h-full object-cover opacity-50 cursor-pointer"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`
            }}
            onClick={handleVideoClick} // Clicking video also toggles mute
          >
            <source src="lv_0_20250428203511 (1).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Animated Blur Shapes */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-2000"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 z-10">
            <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-semibold mb-8 shadow-lg border border-green-200/50">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <Leaf className="h-4 w-4 mr-2" />
                FREE Sustainable Straws Available Now
                <div className="w-2 h-2 bg-green-500 rounded-full ml-3 animate-pulse"></div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Sip Sustainably.
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                  Live Responsibly.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                Get your <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">FREE</span> rice straws made from agricultural waste. 
                <br className="hidden md:block" />
                Zero plastic, zero guilt, 100% biodegradable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <a 
                  href="#order"
                  className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-2 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center">
                    Get FREE Straws Now
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </a>
                <a 
                  href="#about"
                  className="group border-2 border-green-500 text-green-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all duration-300 backdrop-blur-sm bg-white/80 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Learn More
                </a>
              </div>

              {/* Floating Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                  <div key={index} className={`bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100/50 transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                    <feature.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-bold text-sm text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Click to unmute instruction */}
          <div className="absolute bottom-4 left-4 z-20">
            <div className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
              Click video or audio button to enable sound
            </div>
          </div>
        </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">The Impact Numbers</h2>
            <p className="text-xl text-gray-600">Why every straw choice matters for our planet</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center relative">
                <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl mb-6 shadow-lg`}>
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-black text-gray-900 mb-3">{stat.value}</div>
                  <div className="text-gray-600 font-medium leading-tight">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Why Rice Straws?</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Discover the revolutionary alternative that's changing how we think about sustainable drinking.</p>
              </div>
              
              <div className="space-y-8">
                <div className="group flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Recycle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Zero Waste Production</h3>
                    <p className="text-gray-600 leading-relaxed">Made from leftover rice stalks that would otherwise be burned or discarded, contributing to a circular economy and reducing agricultural waste.</p>
                  </div>
                </div>
                
                <div className="group flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Completely Biodegradable</h3>
                    <p className="text-gray-600 leading-relaxed">Decomposes naturally in 2-3 weeks, leaving no harmful residue in soil or water. Unlike plastic that takes 400+ years to break down.</p>
                  </div>
                </div>
                
                <div className="group flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Safe & Edible</h3>
                    <p className="text-gray-600 leading-relaxed">100% food-grade, vegan, gluten-free, and safe to chew or eat. No harmful chemicals, additives, or synthetic materials used.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 rounded-[3rem] transform rotate-3 shadow-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-[3rem] transform -rotate-2 shadow-2xl"></div>
              <img 
                src="Leonardo_Phoenix_10_In_a_visually_striking_commercial_ad_shoot_0.jpg"
                alt="Rice straws in use"
                className="relative rounded-[3rem] shadow-2xl w-full h-[500px] object-cover border-8 border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">100% Eco-Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Perfect Size for Every Drink</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our range of rice straw sizes, each designed for specific beverage types. All available for <span className="font-bold text-green-600">FREE</span>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* FREE Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  FREE
                </div>
                
                <div className="relative text-center">
                  {/* Icon */}
                  <div className="text-6xl mb-4">{product.icon}</div>
                  
                  {/* Size */}
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{product.size}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{product.size}</h3>
                  <p className="text-green-600 font-bold mb-3 text-lg">{product.use}</p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.description}</p>
                  
                  <div className="text-center">
                    <span className="text-gray-400 line-through text-lg">{product.originalPrice}</span>
                    <span className="text-3xl font-black text-green-600 ml-3">FREE</span>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Get Your FREE Rice Straws</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Fill out the form below and we'll contact you via WhatsApp to arrange your free samples.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="relative bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-2xl p-8 md:p-16 border border-gray-100/50">
            {/* Form Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                <Package className="h-4 w-4 mr-2" />
                FREE Sample Request
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Company/Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Quantity Needed *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg"
                  placeholder="Number of straws"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Preferred Size
                </label>
                <div className="relative">
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 appearance-none bg-white/80 backdrop-blur-sm text-lg"
                  >
                    <option value="6.5mm">6.5mm - Water, juice, tea</option>
                    <option value="8mm">8mm - Smoothies, milkshakes</option>
                    <option value="10mm">10mm - Thick milkshakes</option>
                    <option value="13mm">13mm - Bubble tea</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm text-lg"
                placeholder="Tell us about your specific requirements or questions..."
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
                isFormValid
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-1 shadow-2xl hover:shadow-green-500/25'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isFormValid && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              )}
              <span className="relative flex items-center">
                {isFormValid ? (
                  <>
                    Send Request via WhatsApp
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </>
                ) : (
                  'Please fill required fields'
                )}
              </span>
            </button>

            <p className="text-sm text-gray-500 text-center mt-6">
              By submitting, you agree to receive WhatsApp messages from RootWave team.
            </p>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Get in Touch</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions? Our team is here to help you make the switch to sustainable straws.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-10 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Girish Sp</h3>
              <p className="text-gray-600 mb-6 font-medium">Sales & Support</p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">info@rootwave.org</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">+91 77600 21026</span>
                </div>
              </div>
            </div>

            <div className="group text-center p-10 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Package className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Arpan Tiwari</h3>
              <p className="text-gray-600 mb-6 font-medium">Product & Business Development</p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">arpan@rootwave.org</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">+91 83195 45466</span>
                </div>
              </div>
            </div>

            <div className="group text-center p-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-green-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Prateek P.</h3>
              <p className="text-gray-600 mb-6 font-medium">CEO & CMO</p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3 text-gray-600 hover:text-green-600 transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">prateek@rootwave.org</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-gray-600 hover:text-green-600 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="font-bold text-lg">+91 79838 82050</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-emerald-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-2xl">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">RootWave</span>
                <div className="text-sm text-gray-400 font-medium">Sustainable Solutions</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-lg font-light">Sip Sustainably. Live Responsibly.</p>
            <p className="text-gray-500">
              © 2024 RootWave. Making the world greener, one straw at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;