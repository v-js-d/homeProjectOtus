import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export type User = {
  username: string;
  password: string;
};

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
  config: {
    data: string;
  };
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
  const user = ref<User>();
  const product = ref<Product>();
  const products = ref<Array<Product>>([]);

  const userName = computed(() => user.value?.username);

  const login = async (username: string, password: string) => {
    console.log(username, password);
    const res: loginResponse = await axios.post(
      "https://fakestoreapi.com/auth/login",
      {
        username,
        password,
      },
    );
    user.value = JSON.parse(res.config.data);
    sessionStorage.setItem("token", res.data.token);
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
    user,
    userName,
    products,
    product,
    login,
    getProducts,
    getProduct,
    createProduct,
    payOrder,
  };
});
