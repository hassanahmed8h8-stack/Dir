import { useState, useEffect } from 'react';
import { Property } from '../../types';
import { Plus, Edit, Trash2, LogOut, CheckCircle, Home, AlertTriangle } from 'lucide-react';
import PropertyFormModal from './PropertyFormModal';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, addDoc, setDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

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

  const toggleStatus = async (id: string) => {
    const property = properties.find(p => p.id === id);
    if (!property) return;

    try {
      const propertyRef = doc(db, 'properties', id);
      await updateDoc(propertyRef, {
        status: property.status === 'متاح' ? 'تم البيع' : 'متاح'
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;
    try {
      await deleteDoc(doc(db, 'properties', propertyToDelete));
      setPropertyToDelete(null);
    } catch (error) {
      console.error("Error deleting property:", error);
      setPropertyToDelete(null);
    }
  };

  const handleSave = async (property: Property) => {
    try {
      if (editingProperty) {
        const propertyRef = doc(db, 'properties', property.id);
        await setDoc(propertyRef, property);
      } else {
        const { id, ...propertyData } = property;
        await addDoc(collection(db, 'properties'), propertyData);
      }
      setIsFormOpen(false);
      setEditingProperty(undefined);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const openEditForm = (property: Property) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingProperty(undefined);
    setIsFormOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-brand-black text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-orange bg-white p-0.5">
                <img 
                  src="https://ik.imagekit.io/bualmg8h2/%D9%84%D9%88%D8%AC%D9%88_%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA_%D8%A7%D9%84%D8%AF%D8%A7%D8%B1_202603312245.jpeg" 
                  alt="دار للعقارات" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold">لوحة التحكم | <span className="text-brand-orange">دار للعقارات</span></h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
                <Home size={18} />
                <span className="hidden sm:inline">الموقع</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">تسجيل خروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">إدارة العقارات</h2>
            <p className="text-gray-500 text-sm mt-1">أضف، عدل، أو احذف العقارات المعروضة في موقعك.</p>
          </div>
          <button 
            onClick={openAddForm}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            <span>إضافة عقار جديد</span>
          </button>
        </div>

        {/* Properties Table/List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-orange border-t-transparent"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4 font-bold">العقار</th>
                    <th className="p-4 font-bold">السعر</th>
                    <th className="p-4 font-bold">النوع</th>
                    <th className="p-4 font-bold">الحالة</th>
                    <th className="p-4 font-bold text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                            {property.imageUrl && property.imageUrl.length > 10 && property.imageUrl.includes('.') ? (
                              <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <span className="text-xs text-gray-400">لا توجد صورة</span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{property.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{property.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-brand-orange whitespace-nowrap" dir="ltr">{property.price}</td>
                      <td className="p-4 text-gray-600 text-sm">{property.type}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          property.status === 'متاح' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => toggleStatus(property.id)}
                            title={property.status === 'متاح' ? 'تحديد كمباع' : 'تحديد كمتاح'}
                            className={`p-2 rounded-lg transition-colors ${
                              property.status === 'متاح' 
                                ? 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600' 
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => openEditForm(property)}
                            title="تعديل"
                            className="p-2 bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => setPropertyToDelete(property.id)}
                            title="حذف"
                            className="p-2 bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {properties.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        لا توجد عقارات مضافة حالياً.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {isFormOpen && (
          <PropertyFormModal 
            onClose={() => setIsFormOpen(false)}
            onSave={handleSave}
            initialData={editingProperty}
          />
        )}

        {propertyToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setPropertyToDelete(null)}
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">تأكيد الحذف</h3>
              <p className="text-gray-500 mb-6">هل أنت متأكد من رغبتك في حذف هذا العقار؟ لا يمكن التراجع عن هذا الإجراء.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setPropertyToDelete(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-red-600/20"
                >
                  نعم، احذف
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

