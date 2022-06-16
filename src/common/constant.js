export default {
    url: {
        ONLOGIN: '/',
        LOGINFAIL: '/#/signIn',
        ONLOGOUT: '/signIn',
        LOGIN: 'auth-api/login/manager?id=',
    },
    data: {
        MENULIST: 'menu_list',
        MENUPATH: 'menu_path',
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
        dialog: {
            CHANGEWHICH: 'dialog/changeWhich',
            CHANGDISPLAY1: 'dialog/changeDispaly1',
            CHANGDISPLAY2: 'dialog/changeDispaly2',
            CHANGDISPLAY3: 'dialog/changeDispaly3',
            SETMESSAGE: 'dialog/setConfirmMessage',
            SETSENDDATAS: 'dialog/setSendDatas',
        },
    },


}