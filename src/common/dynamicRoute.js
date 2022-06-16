import router from '@/router';
import dynamicRoutes from '@/router/dynamic.js';
import constant from './constant.js';
import localPath from '../tmp/menuPath.json';

export const writeRoutes = async () => {

    //로컬 json
    const resultData = localPath.resultData;
    const paramRoute = JSON.stringify(resultData);
    window.localStorage.setItem(constant.data.MENUPATH, paramRoute);
    const routes = dynamicRoutes(resultData);
    const modules = import.meta.glob('../views/*/*.vue');
    routes.forEach((item) => {
        // debugger
        if (item.path) {
            const route = {
                path: item.path,
                name: item.name,
                component: modules['../views/' + item.component],
            }
            router.addRoute(route);
        }
    });
}
export const removeRoutes = async () => {
    const localRoutes = window.localStorage.getItem(constant.data.MENUPATH);
    const routes = dynamicRoutes(JSON.parse(localRoutes));
    for (let index = 0; index < routes.length; index++) {
        router.removeRoute(routes[index].name);
    }
}
export const writeLocalRoutes = () => {
    const localRoutes = window.localStorage.getItem(constant.data.MENUPATH);
    const routes = dynamicRoutes(JSON.parse(localRoutes));
    const modules = import.meta.glob('../views/*/*.vue');
    routes.forEach((item) => {
        // debugger
        if (item.path) {
            const route = {
                path: item.path,
                name: item.name,
                component: modules['../views/' + item.component],
            }
            router.addRoute(route);
        }
    })
}