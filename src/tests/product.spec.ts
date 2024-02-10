import { createPinia, setActivePinia } from 'pinia';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { useStoreProduct } from '../store/product.ts';
import axios from 'axios';

vi.mock('axios', () => ({
  __esModule: true, // Это необходимо, чтобы поддерживать синтаксис ES модуля
  default: { // Мокаем экспорт по умолчанию
    get: vi.fn(), // Мокаем методы по необходимости
    post: vi.fn(() => Promise.resolve({
      data: { id: 1, title: "New Product", price: 100, description: "A new product", image: "image_url", category: "category" }
    }))
  },
  get: vi.fn(), // Мокаем именованные экспорты, если нужно использовать axios как { get } from 'axios'
  post: vi.fn() // Пример мокирования именованного экспорта
}));

describe('useStoreProduct', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();
  });

  it("initial store is empty", () => {
    const store = useStoreProduct()
    expect(store.products).toHaveLength(0)
    expect(store.product).toMatchObject({})
  })

  it('createProduct sends the correct post request', async () => {
    const storeProduct = useStoreProduct();
    const productDTO = {
      title: "New Product",
      price: 100,
      description: "A new product",
      image: "image_url",
      category: "category",
    };

    await storeProduct.createProduct(productDTO);
    const mockedAxios = axios;
    expect(mockedAxios.post).toHaveBeenCalledWith(`${process.env.VITE_BASE_URL}/products`, productDTO);
  });
});
