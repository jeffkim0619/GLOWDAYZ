<template>
  <div id="layout-config" :class="containerClass">
    <a
      href="#"
      class="layout-config-button"
      id="layout-config-button"
      @click="toggleConfigurator"
    >
      <i class="pi pi-cog"></i>
    </a>
    <Button
      class="p-button-danger layout-config-close p-button-rounded p-button-text"
      icon="pi pi-times"
      @click="hideConfigurator"
      :style="{ 'z-index': 1 }"
    ></Button>

    <div class="layout-config-content">
      <p class="text-2xl mt-0">Component Scale</p>
      <div class="config-scale">
        <Button
          icon="pi pi-minus"
          @click="decrementScale()"
          class="p-button-text"
          :disabled="scale === scales[0]"
        />
        <i
          class="pi pi-circle-on"
          v-for="s of scales"
          :class="{ 'scale-active': s === scale }"
          :key="s"
        />
        <Button
          icon="pi pi-plus"
          @click="incrementScale()"
          class="p-button-text"
          :disabled="scale === scales[scales.length - 1]"
        />
      </div>

      <p class="text-3xl">Themes</p>

      <p class="text-lg m-2">Material Design Compact</p>
      <div class="grid free-themes grid-cols-2">
        <div class="m-5">
          <button
            class="p-link"
            type="button"
            @click="changeTheme($event, 'lara-light-indigo', false)"
          >
            <img
              class="block"
              src="@/assets/images/themes/lara-light-indigo.png"
              alt="Material Compact Light Indigo"
            />
            <p :class="themeClass">Light</p>
          </button>
        </div>
        <div class="m-5">
          <button
            class="p-link"
            type="button"
            @click="changeTheme($event, 'lara-dark-indigo', true)"
          >
            <img
              class="block"
              src="@/assets/images/themes/lara-dark-indigo.png"
              alt="Material Dark Indigo"
            />
            <p :class="themeClass">Dark</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from "@vue/runtime-core";
import { themesToggle } from "@/common/toggleTheme.js";

export default {
  props: {
    layoutMode: {
      type: String,
      default: null,
    },
  },
  setup() {
    const { emit } = getCurrentInstance();
    const { dark, changeNowTheme } = themesToggle();
    const changeLayout = (event, layoutMode) => {
      emit("layout-change", layoutMode);
      event.preventDefault();
    };
    const themeClass = computed(() => [
      "text-lg",
      "mt-2",
      { "text-white-alpha-90": dark.value },
    ]);
    const changeTheme = (event, themes, darks) => {
      window.sessionStorage.removeItem("theme");
      window.sessionStorage.removeItem("dark");
      const newValue = "/themes/" + themes + "/theme.css";
      let themeElement = document.getElementById("dak-link");
      changeNowTheme(newValue, darks);
      window.sessionStorage.setItem("theme", newValue);
      window.sessionStorage.setItem("dark", darks);
      themeElement.setAttribute("href", newValue);
    };
    return {
      changeLayout,
      themeClass,
      changeTheme,
    };
  },
  data() {
    return {
      active: false,
      scale: 14,
      scales: [12, 13, 14, 15, 16],
    };
  },
  watch: {
    $route() {
      if (this.active) {
        this.active = false;
        this.unbindOutsideClickListener();
      }
    },
  },
  outsideClickListener: null,
  methods: {
    toggleConfigurator(event) {
      this.active = !this.active;
      event.preventDefault();

      if (this.active) this.bindOutsideClickListener();
      else this.unbindOutsideClickListener();
    },
    hideConfigurator(event) {
      this.active = false;
      this.unbindOutsideClickListener();
      event.preventDefault();
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.active && this.isOutsideClicked(event)) {
            this.active = false;
          }
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    isOutsideClicked(event) {
      return !(
        this.$el.isSameNode(event.target) || this.$el.contains(event.target)
      );
    },
    decrementScale() {
      this.scale--;
      this.applyScale();
    },
    incrementScale() {
      this.scale++;
      this.applyScale();
    },
    applyScale() {
      document.documentElement.style.fontSize = this.scale + "px";
    },
  },
  computed: {
    containerClass() {
      return ["layout-config", { "layout-config-active": this.active }];
    },
    rippleActive() {
      return this.$primevue.config.ripple;
    },
    inputStyle() {
      return this.$appState.inputStyle;
    },
  },
};
</script>
