import { Property } from '../types';
import { MapPin, BedDouble, Bath, Maximize, MessageCircle, X, CheckCircle2, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  property: Property;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: Props) {
  const isSold = property.status === 'تم البيع';
  const message = `مرحباً مكتب دار للعقارات، أريد الاستفسار عن العقار: ${property.title} (السعر: ${property.price})`;
  const whatsappUrl = `https://wa.me/9647750999818?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></motion.div>

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="relative h-64 sm:h-80 shrink-0 bg-gray-100 flex items-center justify-center">
          {property.imageUrl && property.imageUrl.length > 10 && property.imageUrl.includes('.') ? (
            <img 
              src={property.imageUrl} 
              alt={property.title} 
              className={`w-full h-full object-cover ${isSold ? 'grayscale opacity-90' : ''}`}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="text-gray-400">لا توجد صورة</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-6 right-6 left-6 flex justify-between items-end">
            <div>
              <span className="inline-block bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-lg">
                {property.type}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{property.title}</h2>
            </div>
            <div className={`px-4 py-2 rounded-xl font-bold text-sm sm:text-base shadow-lg backdrop-blur-md ${
              isSold ? 'bg-red-500/90 text-white' : 'bg-white/20 text-white border border-white/30'
            }`}>
              {property.status}
            </div>
          </div>
        </div>

        {/* Details Section (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow custom-scrollbar">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
            <div>
              <p className="text-gray-500 text-sm mb-1">السعر المطلوب</p>
              <p className="text-3xl font-extrabold text-brand-orange">{property.price}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <MapPin size={20} className="ml-2 text-brand-orange" />
                <span className="font-medium">{property.location}</span>
              </div>
              {property.googleMapsLink && property.googleMapsLink.length > 10 && property.googleMapsLink.includes('.') && (
                <a 
                  href={property.googleMapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline px-2"
                >
                  <Navigation size={16} className="ml-1" />
                  عرض الموقع على الخريطة
                </a>
              )}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100">
              <Maximize size={24} className="mb-2 text-brand-black" />
              <span className="text-sm text-gray-500 mb-1">المساحة</span>
              <span className="font-bold text-gray-900">{property.area}</span>
            </div>
            {property.bedrooms !== undefined && (
              <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100">
                <BedDouble size={24} className="mb-2 text-brand-black" />
                <span className="text-sm text-gray-500 mb-1">غرف النوم</span>
                <span className="font-bold text-gray-900">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100">
                <Bath size={24} className="mb-2 text-brand-black" />
                <span className="text-sm text-gray-500 mb-1">الحمامات</span>
                <span className="font-bold text-gray-900">{property.bathrooms}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">تفاصيل العقار</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {property.description}
            </p>
          </div>
          
          {/* Features List (Mock) */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">المميزات</h3>
            <div className="grid grid-cols-2 gap-3">
              {['موقع استراتيجي', 'تشطيب سوبر ديلوكس', 'سند طابو صرف', 'جاهز للسكن'].map((feature, idx) => (
                <div key={idx} className="flex items-center text-gray-700">
                  <CheckCircle2 size={18} className="text-green-500 ml-2 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Footer Action */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 shrink-0">
          <a 
            href={isSold ? '#' : whatsappUrl}
            target={isSold ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all transform ${
              isSold 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-brand-black hover:bg-gray-800 text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1'
            }`}
            onClick={(e) => isSold && e.preventDefault()}
          >
            {isSold ? (
              <span>هذا العقار مباع</span>
            ) : (
              <>
                <MessageCircle size={24} className="text-brand-orange" />
                <span>تواصل معنا لحجز العقار</span>
              </>
            )}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
