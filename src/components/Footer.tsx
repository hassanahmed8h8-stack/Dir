import { Phone, MapPin, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-gray-300 pt-16 pb-8 border-t-4 border-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-orange bg-white p-1">
                <img 
                  src="https://ik.imagekit.io/bualmg8h2/%D9%84%D9%88%D8%AC%D9%88_%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA_%D8%A7%D9%84%D8%AF%D8%A7%D8%B1_202603312245.jpeg" 
                  alt="دار للعقارات" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold text-white">دار <span className="text-brand-orange">للعقارات</span></h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              مكتب دار للعقارات، خيارك الأمثل والموثوق للبحث عن عقار أحلامك. نقدم خدمات بيع وشراء العقارات بأعلى مستويات الاحترافية والشفافية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-brand-orange transition-colors">الرئيسية</a></li>
              <li><a href="#properties" className="hover:text-brand-orange transition-colors">العقارات المتوفرة</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">من نحن</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
              تواصل معنا
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-orange mt-1 shrink-0" size={20} />
                <span>العراق، بغداد، (اكتب عنوان مكتبك هنا)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-orange shrink-0" size={20} />
                <span dir="ltr">+964 775 099 9818</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-orange shrink-0" size={20} />
                <span>info@dar-realestate.com</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} مكتب دار للعقارات.
          </p>
        </div>
      </div>
    </footer>
  );
}
