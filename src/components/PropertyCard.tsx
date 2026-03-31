import { Property } from '../types';
import { MapPin, BedDouble, Bath, Maximize } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  property: Property;
  onClick: () => void;
}

export default function PropertyCard({ property, onClick }: Props) {
  const isSold = property.status === 'تم البيع';

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 cursor-pointer group flex flex-col h-full relative"
    >
      {/* Status Badge */}
      <div className={`absolute top-4 right-4 z-10 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-md ${
        isSold ? 'bg-red-500/90 text-white' : 'bg-white/90 text-brand-black'
      }`}>
        {property.status}
      </div>

      {/* Image */}
      <div className="relative h-60 overflow-hidden p-2">
        <div className="w-full h-full rounded-2xl overflow-hidden relative bg-gray-100 flex items-center justify-center">
          {property.imageUrl && property.imageUrl.length > 10 && property.imageUrl.includes('.') ? (
            <img 
              src={property.imageUrl} 
              alt={property.title} 
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isSold ? 'grayscale opacity-80' : ''}`}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="text-gray-400">لا توجد صورة</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-brand-orange transition-colors">{property.title}</h3>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={16} className="ml-1 text-gray-400" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <p className="text-brand-orange font-extrabold text-xl" dir="ltr">{property.price}</p>
          
          {/* Mini Specs */}
          <div className="flex items-center gap-3 text-gray-400">
            <div className="flex items-center gap-1" title="المساحة">
              <Maximize size={16} />
              <span className="text-xs font-semibold">{property.area.replace('م²', '')}</span>
            </div>
            {property.bedrooms !== undefined && (
              <div className="flex items-center gap-1" title="غرف النوم">
                <BedDouble size={16} />
                <span className="text-xs font-semibold">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-1" title="الحمامات">
                <Bath size={16} />
                <span className="text-xs font-semibold">{property.bathrooms}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
