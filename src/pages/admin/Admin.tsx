import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if the user is the admin
        if (user.email === 'admin@dar.com') {
          setIsAuthenticated(true);
        } else {
          // If not admin, sign them out and don't authenticate
          await signOut(auth);
          setIsAuthenticated(false);
          alert('عذراً، هذا الحساب ليس لديه صلاحيات الإدارة.');
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-orange border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}
