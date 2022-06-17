export default {
    url: {
        GETDATA:'test/app/products.json',
    },
    data: {
        MENUPATH: 'menu_path',
    },
    errorMsg:{
        NODATA:'모든 입력 항목은 비어 있을 수 없습니다.',
        NAMEERROR:'이름은 두글자 이상의 문자열 입니다.',
    },
    store: {
        theme: {
            SET_THEME: 'theme/changeTheme',
            SET_DARK: 'theme/changeDarkState'
        },
        menulist: {
            CHANGEMOBILEMENUSTATE: 'sideNav/changeMobileMenuState',
            CHANGEMOBILESTATE: 'sideNav/changeMobileMenuState',
            CHANGEOVERLAYMENUSTATE: 'sideNav/changeOverlayMenuState',
            CHANGEOVERMENUSTATE: 'sideNav/changeOverlayMenuState',
            CHANGESTATICMENUINACTIVE: 'sideNav/changeStaticMenuInactive',
            CHANGELAYOUTMODE: 'sideNav/changeLayoutMode',
            CHANGEMENUONCLICK: 'sideNav/checkMenuOnclick',
            SETMENULIST: 'sideNav/setMenuList',
        },
        menuName: {
            CHECKONMENU: 'menuName/checkOnMenu',
        },
    },


}