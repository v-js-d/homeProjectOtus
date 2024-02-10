import { describe, beforeEach, expect, it } from "vitest";
import component from "../components/MyHeader.vue";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useStoreUser } from "../store/user.ts";

describe("MyHeader component", () => {
  function buildWrapper(path = "/") {
    const wrapper = mount(component, {
      global: {
        stubs: ["router-link"],
        mocks: {
          $route: {
            path,
          },
        },
      },
    });
    return wrapper;
  }
  beforeEach(async () => {
    setActivePinia(createPinia());
  });

  it("mounts without errors", () => {
    const wrapper = buildWrapper("/");
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("mounts when user available", async () => {
    const userStore = useStoreUser();
    userStore.user = { username: "Alex", password: "1234" };

    const wrapper = buildWrapper("/products");
    expect(wrapper.html()).toContain("Alex");
  });
});
