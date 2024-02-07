export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
};

export type createProductDTO = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export type productsResponse = {
  data: Array<Product>;
};

export type productResponse = {
  data: Product;
};
