export interface CartType {
  id: number;
  product: {
    name: string;
    price: number;
    image: string;
  };
  productId: number;
  quantity: number;
  totalPrice: number;
  userId: number;
}

export interface IProductDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}
