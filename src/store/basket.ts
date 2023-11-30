import { defineStore } from "pinia";
import axios from "axios";

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

export const useStoreBasket = defineStore("basket", () => {
  const payOrder = async (dto: payOrderDTO) => {
    await axios.post("https://httpbin.org/anything", {
      ...dto,
    });
  };

  return {
    // basket,
    payOrder,
  };
});
