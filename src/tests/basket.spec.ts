import { describe, beforeEach, it, expect, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useStoreBasket } from "../store/basket";
import axios from "axios";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: 'mock response' })),
  }
}));

describe("useStoreBasket", () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
  });

  it("import without errors", () => {
    expect(useStoreBasket).toBeDefined()
  })

  it("payOrder sends a correct post request", async () => {
    const storeBasket = useStoreBasket();

    const mockDto = {
      name: "name",
      surname: "surname",
      email: "email@email.ru",
      telephone: "+79999999999",
      city: "city",
      address: "address",
      date1: "date1",
      date2: "date2",
      agreement: true
    };

    const expectedUrl = `${import.meta.env.VITE_BASCET_URL}/anything`;

    await storeBasket.payOrder(mockDto);

    expect(axios.post).toHaveBeenCalledWith(expectedUrl, mockDto);
  });
})
