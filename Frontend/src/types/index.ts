export interface Product {
  id: string;
  name: string;
  vendorName: string;
  sku: string;
  quantity: number;
  image?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  customerName: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}