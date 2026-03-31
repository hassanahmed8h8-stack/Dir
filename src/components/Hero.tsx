import { useState } from 'react';
import { Search, MapPin, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onSearch: (term: string, type: string) => void;
}

export default function Hero({ onSearch }: Props) {
  const [term, setTerm] = useState('');
  const [type, setType] = useState('الكل');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term, type);
  };

  return (
    <div className="relative bg-brand-black min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden pt-10 pb-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/50 to-brand-black z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full px-4 max-w-5xl mx-auto mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-sm font-bold mb-6">
            الخيار الأول للعقارات في العراق
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            ابحث عن <span className="text-brand-orange">عقار أحلامك</span><br/>بكل سهولة
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            نقدم لك أفضل العروض العقارية للبيع والشراء في أرقى المواقع. تصفح عقاراتنا الآن وتواصل معنا مباشرة.
          </p>
        </motion.div>
        
        {/* Search Bar (Functional) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-4 rounded-3xl shadow-2xl max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus-within:border-brand-orange transition-colors">
              <MapPin className="text-brand-orange ml-3" size={20} />
              <input 
                type="text" 
                placeholder="المنطقة، الحي..." 
                className="bg-transparent border-none outline-none w-full text-gray-700"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus-within:border-brand-orange transition-colors">
              <Home className="text-brand-orange ml-3" size={20} />
              <select 
                className="bg-transparent border-none outline-none w-full text-gray-700 appearance-none cursor-pointer"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="الكل">كل العقارات</option>
                <option value="فيلا">فيلا</option>
                <option value="شقة">شقة</option>
                <option value="أرض">أرض</option>
                <option value="بيت">بيت مستقل</option>
              </select>
            </div>
            <button 
              type="submit"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3 md:py-0 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Search size={20} />
              <span>بحث</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
