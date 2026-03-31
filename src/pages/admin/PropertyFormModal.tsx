import { useState, useRef } from 'react';
import { Property } from '../../types';
import { X, Upload, Save, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

interface Props {
  onClose: () => void;
  onSave: (property: Property) => void;
  initialData?: Property;
}

export default function PropertyFormModal({ onClose, onSave, initialData }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Property>>(
    initialData || {
      title: '',
      description: '',
      price: '',
      location: '',
      area: '',
      type: 'فيلا',
      status: 'متاح',
      imageUrl: '',
      googleMapsLink: ''
    }
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `properties/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData({ ...formData, imageUrl: downloadURL });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('حدث خطأ أثناء رفع الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert('يرجى رفع صورة للعقار');
      return;
    }
    
    const propertyToSave = {
      ...formData,
      id: formData.id || Math.random().toString(36).substr(2, 9)
    } as Property;
    
    onSave(propertyToSave);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-brand-black p-6 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold text-white">
            {initialData ? 'تعديل العقار' : 'إضافة عقار جديد'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
          <form id="property-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رابط صورة العقار</label>
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <input 
                    type="url" 
                    required
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange"
                    placeholder="https://example.com/image.jpg"
                    dir="ltr"
                  />
                </div>
                {formData.imageUrl && formData.imageUrl.length > 10 && formData.imageUrl.includes('.') && (
                  <div className="w-24 h-24 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0 relative group">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, imageUrl: ''})}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="text-white" size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">عنوان العقار</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange"
                  placeholder="مثال: فيلا فاخرة للبيع"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">السعر</label>
                <input 
                  type="text" 
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange"
                  placeholder="مثال: 150,000,000 د.ع"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الموقع</label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange"
                  placeholder="مثال: بغداد، المنصور"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رابط خرائط جوجل (اختياري)</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="url" 
                    value={formData.googleMapsLink || ''}
                    onChange={(e) => setFormData({...formData, googleMapsLink: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:border-brand-orange"
                    placeholder="https://maps.google.com/..."
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">المساحة</label>
                <input 
                  type="text" 
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange"
                  placeholder="مثال: 200 م²"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">نوع العقار</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange"
                >
                  <option value="فيلا">فيلا</option>
                  <option value="شقة">شقة</option>
                  <option value="أرض">أرض</option>
                  <option value="بيت">بيت مستقل</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">حالة العقار</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'متاح' | 'تم البيع'})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange"
                >
                  <option value="متاح">متاح</option>
                  <option value="تم البيع">تم البيع</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">عدد الغرف (اختياري)</label>
                <input 
                  type="number" 
                  value={formData.bedrooms || ''}
                  onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value) || undefined})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">عدد الحمامات (اختياري)</label>
                <input 
                  type="number" 
                  value={formData.bathrooms || ''}
                  onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value) || undefined})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">وصف العقار</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-orange resize-none"
                placeholder="اكتب وصفاً مفصلاً للعقار ومميزاته..."
              ></textarea>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            إلغاء
          </button>
          <button 
            type="submit"
            form="property-form"
            disabled={isUploading}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>حفظ العقار</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
