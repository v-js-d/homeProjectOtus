import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

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

export type loginResponse = {
  data: {
    token: string;
  };
};

export type createProductDTO = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export type payOrderDTO = {
  name: string;
  surname: string;
  email: string;
  telephone: string;
  city: string;
  address: string;
  date1: string;
  date2: string;
  agreement: boolean;
};

export type productsResponse = {
  data: Array<Product>;
};

export type productResponse = {
  data: Product;
};

export const useStore = defineStore("counter", () => {
  const product = ref<Product>();
  const products = ref<Array<Product>>([]);

  const login = async (username: string, password: string) => {
    console.log(username, password);
    const res: loginResponse = await axios.post(
      "https://fakestoreapi.com/auth/login",
      {
        username,
        password,
      },
    );
    localStorage.setItem("login", "true");
    localStorage.setItem("token", res.data.token);
  };

  const getProducts = async () => {
    const res: productsResponse = await axios.get(
      "https://fakestoreapi.com/products",
    );
    products.value = res.data;
  };

  const getProduct = async (id: number) => {
    const res: productResponse = await axios.get(
      `https://fakestoreapi.com/products/${id}`,
    );
    product.value = res.data;
  };

  const createProduct = async (dto: createProductDTO) => {
    await axios.post("https://fakestoreapi.com/products", {
      ...dto,
    });
  };

  const payOrder = async (dto: payOrderDTO) => {
    await axios.post("https://httpbin.org/anything", {
      ...dto,
    });
  };

  return {
    products,
    product,
    login,
    getProducts,
    getProduct,
    createProduct,
    payOrder,
  };
});
