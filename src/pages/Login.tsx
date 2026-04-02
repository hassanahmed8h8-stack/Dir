import { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('هذا الحساب مسجل مسبقاً.');
      } else if (err.code === 'auth/weak-password') {
        setError('كلمة المرور ضعيفة جداً.');
      } else {
        setError('الإيميل أو كلمة المرور غير صحيحة.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err: any) {
      console.error('Google login error:', err);
      setError('حدث خطأ أثناء تسجيل الدخول باستخدام جوجل.');
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
          <Link to="/" className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-sm font-bold">
            العودة
          </Link>
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-brand-orange bg-white p-1 mb-4">
            <img 
              src="https://ik.imagekit.io/bualmg8h2/%D9%84%D9%88%D8%AC%D9%88_%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA_%D8%A7%D9%84%D8%AF%D8%A7%D8%B1_202603312245.jpeg" 
              alt="دار للعقارات" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">مرحباً بك في دار للعقارات</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                  placeholder="user@example.com"
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
              <span>{isLoading ? 'جاري التحميل...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}</span>
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-bold">أو</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="mt-6 w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-70"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>{isLoading ? 'جاري الدخول...' : 'الدخول باستخدام جوجل'}</span>
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-500 hover:text-brand-orange font-bold transition-colors"
            >
              {isLogin ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
