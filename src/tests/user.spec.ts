import { describe, beforeEach, it, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import * as storeUser from "../store/user.ts";

describe('useStoreUser', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
  });

  it('import without errors', () => {
    expect(storeUser).toBeDefined()
    expect(typeof  storeUser).toBe('object')
  })
})
