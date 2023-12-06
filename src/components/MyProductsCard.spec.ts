import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import component from "./MyProductsCard.vue";

describe("MyProductsCard component", () => {
  const propsData = {
    id: 101,
    image: "none",
    title: "Product 1",
    category: "computers",
    price: 600,
    description: "Lorem ipsum",
    rating: {
      rate: 4.5,
      count: 200,
    },
    quantity: 35,
    deleteHandler: vi.fn(),
  };
  function buildWrapper() {
    return mount(component, {
      propsData,
      global: {
        mocks: {
          $route: {
            path: "/basket-page",
          }
        }
      },
    });
  }

  test("mounts without errors", () => {
    const wrapper = buildWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
