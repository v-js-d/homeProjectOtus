import { describe, expect, it } from "vitest";
import component from "../components/MyInput.vue";
import { mount } from "@vue/test-utils";

describe("MyInput component", () => {
  function buildWrapper(value: string) {
    const wrapper = mount(component, {
      propsData: { modelValue: value },
    });
    return wrapper;
  }

  it("mounts without errors", () => {
    const wrapper = buildWrapper("hello search");
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("can input", () => {
    const wrapper = buildWrapper("hello search");
    const input = wrapper.find("input");
    input.setValue("updated!");
    input.trigger("change");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["updated!"]);
  });
});
