import { computed } from 'vue';
import { useStore } from 'vuex';
import constant from '@/common/constant.js';

export const themesToggle = () => {
    const store = useStore();
    const dark = computed(() => store.state.theme.dark);
    const theme = computed(() => store.state.theme.themeNm);
    const changeNowTheme = (nowTheme, isDark) => {
        store.dispatch(constant.store.theme.SET_THEME, nowTheme);
        store.dispatch(constant.store.theme.SET_DARK, isDark);
    }
    return {
        dark,
        theme,
        changeNowTheme
    }
}