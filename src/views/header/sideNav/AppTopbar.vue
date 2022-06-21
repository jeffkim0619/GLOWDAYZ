<template>
  <div class="layout-topbar">
    <div class="flex align-items-center justify-content-center">
      <router-link to="/" class="layout-topbar-logo">
        <span>Glowdayz Online Test</span>
      </router-link>
      <button
        class="p-link layout-menu-button layout-topbar-button"
        @click="onMenuToggle"
      >
        <i class="pi pi-bars"></i>
      </button>
    </div>
    <div class="ml-5">
      <span>{{ menuOnClickNow }} </span>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import { themesToggle } from "@/common/toggleTheme.js";
import { menuOnClick } from "@/common/sideNavService.js";
export default {
  setup() {
    const op = ref();
    const display1 = ref(false);
    const { emit } = getCurrentInstance();
    const { dark } = themesToggle();
    const onMenuToggle = (event) => {
      emit("menu-toggle", event);
    };
    const topbarImage = () => {
      return dark.value ? "images/logo-dark.svg" : "images/logo-light.svg";
    };
    const { menuOnClickNow } = menuOnClick();

    return {
      onMenuToggle,
      op,
      display1,
      topbarImage,
      menuOnClickNow,
    };
  },
};
</script>

<style scoped>
.p-button:enabled:active {
  background: rgba(63, 81, 181, 0.68);
  color: unset;
  border-color: transparent;
}
.p-button:enabled:hover {
  background: rgba(63, 81, 181, 0.92);
  color: unset;
  border-color: transparent;
}
</style>