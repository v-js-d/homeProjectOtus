import { describe, beforeEach, expect, test } from "vitest";

import component from "./MyInput.vue";
import { mount } from "@vue/test-utils";

describe("MyInput component", () => {
  function buildWrapper(value) {
    const wrapper = mount(component, {
      propsData: { modelValue: value },
    });
    return wrapper;
  }

  test("mounts without errors", () => {
    const wrapper = buildWrapper("hello search");
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("can input", () => {
    const wrapper = buildWrapper('hello search');
    const input = wrapper.find('input')
    input.setValue('updated!')
    input.trigger('change')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['updated!'])
  });
});
