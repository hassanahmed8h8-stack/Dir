import { useState } from 'react';
import { mockProperties } from '../data/mockProperties';
import { Property } from '../types';
import { Lock, LogOut, Plus, Edit, Trash2, Home, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // كلمة سر مؤقتة للتجربة (1234)
    if (password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  const toggleStatus = (id: string) => {
    setProperties(properties.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'متاح' ? 'تم البيع' : 'متاح' };
      }
      return p;
    }));
  };

  const deleteProperty = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">لوحة تحكم الإدارة</h2>
            <p className="text-gray-500 text-sm mt-2">يرجى إدخال كلمة المرور للدخول (1234)</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-center text-lg tracking-widest"
                dir="ltr"
              />
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-brand-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
            >
              تسجيل الدخول
            </button>
            <Link to="/" className="block text-center text-brand-orange text-sm hover:underline mt-4">
              العودة للموقع
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-brand-black text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
              <Lock size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">لوحة التحكم | دار للعقارات</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2 text-sm transition-colors">
              <Home size={18} />
              <span>عرض الموقع</span>
            </Link>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm transition-colors"
            >
              <LogOut size={18} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-1">إجمالي العقارات</p>
              <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Home size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-1">العقارات المتاحة</p>
              <p className="text-3xl font-bold text-green-600">{properties.filter(p => p.status === 'متاح').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-1">العقارات المباعة</p>
              <p className="text-3xl font-bold text-red-600">{properties.filter(p => p.status === 'تم البيع').length}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
              <XCircle size={24} />
            </div>
          </div>
        </div>

        {/* Actions Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">إدارة العقارات</h2>
          <button className="bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md w-full sm:w-auto justify-center">
            <Plus size={20} />
            <span>إضافة عقار جديد</span>
          </button>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">العقار</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">النوع</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">السعر</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">الحالة</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={property.imageUrl} alt={property.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{property.title}</p>
                          <p className="text-xs text-gray-500">{property.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{property.type}</td>
                    <td className="px-6 py-4 text-sm font-bold text-brand-orange" dir="ltr">{property.price}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        property.status === 'متاح' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => toggleStatus(property.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            property.status === 'متاح' 
                              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title={property.status === 'متاح' ? 'تحديد كمباع' : 'تحديد كمتاح'}
                        >
                          {property.status === 'متاح' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                        </button>
                        <button className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="تعديل">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteProperty(property.id)}
                          className="p-2 bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors" 
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {properties.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                لا توجد عقارات مضافة حالياً.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
