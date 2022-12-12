import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mount } from "@vue/test-utils";
import NavigationComponent from "../NavigationComponent.vue";
import {useSpotifyStore} from "../../stores/spotify";

describe("NavigationComponent", () => {
  let spotifyStore = null;
  beforeEach(() => {
    setActivePinia(createPinia());
    spotifyStore = useSpotifyStore();
  });

  it("renders properly", () => {
    const wrapper = mount(NavigationComponent, {});
    expect(wrapper.text()).toContain("Home");
  });
});
