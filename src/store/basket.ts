import { defineStore } from "pinia";
import axios from "axios";
import type { payOrderDTO } from "../types/typesBasket.ts";

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
