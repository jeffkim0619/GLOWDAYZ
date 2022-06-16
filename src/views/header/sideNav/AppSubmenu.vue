<template>
  <ul v-if="items">
    <template v-for="(item, i) of items">
      <li
        v-if="visible(item) && !item.separator"
        :key="item.label || i"
        role="none"
      >
        <router-link
          v-if="item.to"
          :to="item.to"
          :class="[
            item.class,
            'p-ripple',
            'text-lg',
            { 'p-disabled': item.disabled },
          ]"
          :style="item.style"
          @click="onMenuItemClick($event, item, i)"
          :target="item.target"
          exact
          role="menuitem"
          v-ripple
        >
          <!-- <i :class="item.icon"></i> -->
          <span >{{
            item.label
          }}</span>
          <i
            v-if="item.items"
            class="pi pi-fw pi-angle-down menuitem-toggle-icon"
          ></i>
          <Badge v-if="item.badge" :value="item.badge"></Badge>
        </router-link>
        <a
          v-if="!item.to"
          :href="item.url || '#'"
          :style="item.style"
          :class="[
            item.class,
            'p-ripple',
            { 'p-disabled': item.disabled },
            'layout-menuitem-root-text',
          ]"
          @click="onMenuItemClick($event, item, i)"
          :target="item.target"
          role="menuitem"
          v-ripple
        >
          <i :class="item.icon"></i>
          <span class="font-bold text-black-alpha-80 text-xl">{{
            item.label
          }}</span>
          <i
            v-if="item.items"
            class="pi pi-fw pi-angle-down menuitem-toggle-icon"
          ></i>
        </a>
        <transition name="layout-submenu-wrapper">
          <appsubmenu
            v-show="activeIndex === i"
            :items="visible(item) && item.items"
            @menuitem-click="$emit('menuitem-click', $event)"
          ></appsubmenu>
        </transition>
      </li>
      <li
        class="p-menu-separator"
        :style="item.style"
        v-if="visible(item) && item.separator"
        :key="'separator' + i"
        role="separator"
      ></li>
    </template>
  </ul>
</template>
<script>
import { ref } from "@vue/reactivity";
import { getCurrentInstance } from "@vue/runtime-core";
export default {
  name: "appsubmenu",
  props: {
    items: Array,
    root: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const activeIndex = ref(null);
    const { emit } = getCurrentInstance();
    const isRoot = ref(true);
    const onMenuItemClick = (event, item, index) => {

      if(item.items === undefined){
        console.log('tt');
        isRoot.value = true;
      } else {
        isRoot.value = false;
      }
      if (item.disabled) {
        event.preventDefault();
        return;
      }
      if (!item.to && !item.url) {
        event.preventDefault();
      }
      //execute command
      if (item.command) {
        item.command({ originalEvent: event, item: item });
      }
      activeIndex.value = index === activeIndex.value ? null : index;
      

      emit("menuitem-click", {
        originalEvent: event,
        item: item,
      });
    };
    const visible = (item) => {
      return typeof item.visible === "function"
        ? item.visible()
        : item.visible !== false;
    };

    return {
      activeIndex,
      onMenuItemClick,
      visible,
      isRoot,
    };
  },
};
</script>
