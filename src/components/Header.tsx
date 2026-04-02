import { Phone, MapPin, LogIn, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function Header() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-brand-black text-white sticky top-0 z-50 shadow-md border-b-4 border-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-orange bg-white flex items-center justify-center p-1">
              <img 
                src="https://ik.imagekit.io/bualmg8h2/%D9%84%D9%88%D8%AC%D9%88_%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA_%D8%A7%D9%84%D8%AF%D8%A7%D8%B1_202603312245.jpeg" 
                alt="دار للعقارات" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">دار <span className="text-brand-orange">للعقارات</span></h1>
              <p className="text-xs text-gray-400">خيارك الأول للسكن والاستثمار</p>
            </div>
          </div>

          {/* Contact Info Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-300 hover:text-brand-orange transition-colors">
              <MapPin size={18} className="text-brand-orange" />
              <span className="text-sm font-semibold">العراق، بغداد</span>
            </div>
            <a 
              href="https://wa.me/9647750999818" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-2.5 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              <Phone size={18} />
              <span dir="ltr">+964 775 099 9818</span>
            </a>
            
            {/* Auth Section */}
            {!isLoading && (
              <div className="border-r border-gray-700 pr-6 mr-2">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-gray-600" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
                          <User size={16} className="text-gray-300" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-300 hidden lg:block">{user.displayName || 'مستخدم'}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1 text-sm"
                      title="تسجيل خروج"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium text-sm"
                  >
                    <LogIn size={18} />
                    <span>تسجيل الدخول</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
