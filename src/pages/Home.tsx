import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PropertyList from '../components/PropertyList';
import Footer from '../components/Footer';
import SplashScreen from '../components/SplashScreen';
import { AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('الكل');
  const navigate = useNavigate();

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (term: string, type: string) => {
    if (term.trim() === 'داش بورد') {
      navigate('/admin');
      return;
    }
    
    setSearchTerm(term);
    setFilterType(type);
    // Scroll smoothly to the properties section
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero onSearch={handleSearch} />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <PropertyList searchTerm={searchTerm} filterType={filterType} />
        </main>
        <Footer />
      </div>
    </>
  );
}
