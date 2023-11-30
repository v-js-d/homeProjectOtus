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

export const useStoreProduct = defineStore("product", () => {
  const product = ref<Product>();
  const products = ref<Array<Product>>([]);

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

  return {
    products,
    product,
    getProducts,
    getProduct,
    createProduct,
  };
});
