
import React, { useState, useEffect } from 'react';
import { Gift, ArrowRight } from 'lucide-react';

interface FloatingSampleButtonProps {
  onCTAClick: () => void;
}

const FloatingSampleButton: React.FC<FloatingSampleButtonProps> = ({ onCTAClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 100vh (past hero section)
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsVisible(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeInUp">
      <button
        onClick={onCTAClick}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2 font-semibold text-sm hover:-translate-y-1 animate-float"
      >
        <Gift className="h-4 w-4" />
        <span>Request Free Sample</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FloatingSampleButton;
