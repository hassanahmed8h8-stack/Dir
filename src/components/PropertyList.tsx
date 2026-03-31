import { useState, useMemo, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';
import { Property } from '../types';
import { AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface Props {
  searchTerm: string;
  filterType: string;
}

export default function PropertyList({ searchTerm, filterType }: Props) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'properties'), (snapshot) => {
      const propertiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
      setProperties(propertiesData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching properties:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      const matchesType = filterType === 'الكل' || prop.type === filterType;
      const matchesSearch = 
        prop.title.includes(searchTerm) || 
        prop.location.includes(searchTerm) || 
        prop.description.includes(searchTerm);
      return matchesType && matchesSearch;
    });
  }, [searchTerm, filterType, properties]);

  if (isLoading) {
    return (
      <section id="properties" className="py-20 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-orange border-t-transparent"></div>
      </section>
    );
  }

  return (
    <section id="properties" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-6">
          أحدث <span className="text-brand-orange">العقارات</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          تصفح مجموعتنا المختارة من أفضل العقارات المتاحة للبيع. نضمن لك الجودة والسعر المناسب.
        </p>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={() => setSelectedProperty(property)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100 max-w-3xl mx-auto">
          <p className="text-xl text-gray-500 font-semibold mb-2">عذراً، لا توجد عقارات مطابقة لبحثك حالياً.</p>
          <p className="text-gray-400">جرب البحث بكلمات أخرى أو تغيير نوع العقار.</p>
        </div>
      )}

      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
