import { useState } from 'react';
import { Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (username !== 'admin' || password !== 'admin123') {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
      setIsLoading(false);
      return;
    }
    
    try {
      // Try to sign in with the mapped admin email
      await signInWithEmailAndPassword(auth, 'admin@dar.com', 'admin123');
      onLogin();
    } catch (err: any) {
      // If the account doesn't exist yet, create it automatically
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-login-credentials') {
        try {
          await createUserWithEmailAndPassword(auth, 'admin@dar.com', 'admin123');
          onLogin();
        } catch (createErr) {
          console.error('Error creating admin account:', createErr);
          setError('حدث خطأ أثناء إعداد حساب الإدارة.');
        }
      } else {
        console.error('Login error:', err);
        setError('حدث خطأ في تسجيل الدخول.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="bg-brand-black p-8 text-center relative">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-brand-orange bg-white p-1 mb-4">
            <img 
              src="https://ik.imagekit.io/bualmg8h2/%D9%84%D9%88%D8%AC%D9%88_%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA_%D8%A7%D9%84%D8%AF%D8%A7%D8%B1_202603312245.jpeg" 
              alt="دار للعقارات" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-white">تسجيل الدخول للإدارة</h2>
          <p className="text-gray-400 text-sm mt-2">لوحة التحكم الخاصة بمكتب دار للعقارات</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">اسم المستخدم</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                  placeholder="admin"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg mt-8 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <span>{isLoading ? 'جاري الدخول...' : 'دخول للوحة التحكم'}</span>
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-500 hover:text-brand-orange font-medium transition-colors">
              العودة للموقع الرئيسي
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
