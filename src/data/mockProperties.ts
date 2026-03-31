import { Property } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'فيلا فاخرة بتصميم عصري',
    description: 'فيلا راقية جداً بتشطيبات سوبر ديلوكس، تحتوي على حديقة واسعة وكراج يتسع لسيارتين.',
    price: '350,000,000 د.ع',
    location: 'بغداد، المنصور',
    area: '250 م²',
    bedrooms: 5,
    bathrooms: 4,
    type: 'فيلا',
    status: 'متاح',
    imageUrl: 'https://picsum.photos/seed/villa1/800/600'
  },
  {
    id: '2',
    title: 'شقة سكنية إطلالة مميزة',
    description: 'شقة في مجمع سكني راقي، طابق رابع مع مصعد، قريبة من كافة الخدمات.',
    price: '120,000,000 د.ع',
    location: 'بغداد، الكرادة',
    area: '150 م²',
    bedrooms: 3,
    bathrooms: 2,
    type: 'شقة',
    status: 'تم البيع',
    imageUrl: 'https://picsum.photos/seed/apt1/800/600'
  },
  {
    id: '3',
    title: 'قطعة أرض تجارية مميزة',
    description: 'قطعة أرض على شارع عام، تصلح لبناء مجمع تجاري أو عمارة سكنية.',
    price: '500,000,000 د.ع',
    location: 'بغداد، زيونة',
    area: '300 م²',
    type: 'أرض',
    status: 'متاح',
    imageUrl: 'https://picsum.photos/seed/land1/800/600'
  },
  {
    id: '4',
    title: 'بيت مستقل بناء حديث',
    description: 'بيت طابقين بناء درجة أولى، واجهة حجر، جاهز للسكن الفوري.',
    price: '220,000,000 د.ع',
    location: 'بغداد، الغدير',
    area: '200 م²',
    bedrooms: 4,
    bathrooms: 3,
    type: 'بيت',
    status: 'متاح',
    imageUrl: 'https://picsum.photos/seed/house1/800/600'
  }
];
