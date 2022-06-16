<template>
  <div class="layout-menu-container">
    <AppSubmenu
      :items="model"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
    />
  </div>
</template>

<script>
import AppSubmenu from "@/views/header/sideNav/AppSubmenu.vue";
import { getCurrentInstance } from "vue";
export default {
  props: {
    model: Array,
  },
  components: {
    AppSubmenu,
  },
  setup() {
    const { emit } = getCurrentInstance();
    const onMenuItemClick = (event) => {
      emit("menuitem-click", event);
    };
    return {
      onMenuItemClick,
    };
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>