import { describe, beforeEach, it, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import * as storeBasket from "../store/basket.ts";

describe('useStoreBasket', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
  });

  it('import without errors', () => {
    expect(storeBasket).toBeDefined()
    expect(typeof  storeBasket).toBe('object')
  })
})
