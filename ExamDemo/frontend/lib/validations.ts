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

export interface IOrderDetails {
  address: string;
  city: string;
  id: number;
  pincode: number;
  saleProductDetails: {
    product: {
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
  total: number;
  userId: number;
}
