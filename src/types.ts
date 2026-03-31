export interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  type: string;
  status: 'متاح' | 'تم البيع';
  imageUrl: string;
  googleMapsLink?: string;
}
