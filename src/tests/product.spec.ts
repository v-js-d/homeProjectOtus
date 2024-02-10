import { describe, beforeEach, it, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import * as storeProduct from "../store/product.ts";
import axios from "axios";
import type { Product } from "../types/typesProduct.ts";
import { ref } from 'vue'

describe('useStoreProduct', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
  });

  const mockProduct = ref(<Product>{})
  const mockProducts = ref(<Array<Product>>[])

  it('import without errors', () => {
    expect(storeProduct).toBeDefined()
    expect(typeof  storeProduct).toBe('object')
  })

  it('request get products', async () => {
    axios.get = vi.fn().mockResolvedValue({status: 200, data: mockProducts.value})
  })

  it('request get product', async () => {
    axios.get = vi.fn().mockResolvedValue({status: 200, data: mockProduct.value})
  })

  it('request post create product', async () => {
    axios.post = vi.fn().mockResolvedValue({status: 200, data: mockProduct.value})
  })
})
