<template>
  <AppTopbar @menu-toggle="onMenuToggle" />
  <div class="layout-sidebar" @click="onSidebarClick">
    <SideNav :model="menu" @menuitem-click="onMenuItemClick" />
  </div>
</template>
<script>
import SideNav from "@/views/header/sideNav/SideNav.vue";
import AppTopbar from "@/views/header/sideNav/AppTopbar.vue";
import { activeClassName, menuOnClick} from "@/common/sideNavService.js";
import menuList from "../../tmp/menuList.json";
export default {
  components: {
    SideNav,
    AppTopbar,
  },
  setup() {
    const {
      containerClass,
      changeMobileMenuState,
      changeStaticMenuInactive,
      layoutMode,
      mobileMenuActive,
      changeOverlayMenuState,
      changeOverMenuState,
      changeMobileState,
      changeMenuOnclick,
    } = activeClassName();
    const { checkOnMenu } = menuOnClick();

    // //메뉴바 숨김 기능
    const onMenuToggle = (event) => {
      changeMenuOnclick(true);
      if (window.innerWidth >= 992) {
        if (layoutMode.value === "overlay") {
          if (mobileMenuActive.value === true) {
            changeOverMenuState(true);
          }
          changeOverlayMenuState();
          changeMobileState(false);
        } else if (layoutMode.value === "static") {
          changeStaticMenuInactive();
        }
      } else {
        changeMobileMenuState();
      }
      event.preventDefault();
    };
    const onSidebarClick = () => {
      changeMenuOnclick(true);
    };

    const onMenuItemClick = (event) => {
      if (event.item && !event.item.items) {
        checkOnMenu(event.item.headerNm);
        changeOverMenuState(false);
        changeMobileState(false);
      }
    };

    return {
      onMenuItemClick,
      menu: menuList.resultData,
      containerClass,
      onMenuToggle,
      onSidebarClick,
    };
  },
};
</script>

<style lang="scss">
@import "@/App.scss";
</style>
