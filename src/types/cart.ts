import { Product, User } from "./index";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface CartData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  itemCount: number;
  subtotal: number;
}

export interface CartClientProps {
  initialCart?: CartData | null;
  user?: User | null;
}
