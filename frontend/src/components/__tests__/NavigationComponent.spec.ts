import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import NavigationComponent from '../NavigationComponent.vue';

describe("HelloWorld", () => {
  it("renders properly", () => {
    // const wrapper = mount(NavigationComponent, { props: { msg: "Hello Vitest" } });
    const wrapper = mount(NavigationComponent, { });
    expect(wrapper.text()).toContain("Home");
  });
});
