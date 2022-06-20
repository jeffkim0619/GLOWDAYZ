export default {
    url: {
        GETDATA: 'test/app/products.json',
    },
    data: {
        MENUPATH: 'menu_path',
        SORTDATA: [
            {
                name: '평점높은순',
                code: -1,
            },
            {
                name: '평점낮은순',
                code: 1,
            }
        ],
        FILTERDATA: [
            {
                name: '모두',
                code: 'all',
            },
            {
                name: '긍정적',
                code: '긍정적',
            },
            {
                name: '부정적',
                code: '부정적',
            }
        ],
    },
    errorMsg: {
        NODATA: '모든 입력 항목은 비어 있을 수 없습니다.',
        NAMEERROR: '이름은 두글자 이상 문자열 입니다.',
        HBERROR: '신용카드는 16자리 숫자 입니다. 그리고 다음 3가지 형식만 허용 합니다.',
        CARDNUMERROR: '유효하지 않는 카드번호 입니다.',
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