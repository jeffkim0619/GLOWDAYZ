import { createRouter, createWebHashHistory } from 'vue-router';
import NotFoundPage from '@/views/error/404.vue';

const routes = [
    {
        path: '/userInfomation',
        component: () => import('@/views/userInfomation/UserInfomation.vue'),
        children: [
            {
                path: '/userInfomation/detail',
                name: 'detail',
                component: () => import('@/views/userInfomation/info/UserDetail.vue'),
            },
            {
                path: '/userInfomation/address',
                name: 'address',
                component: () => import('@/views/userInfomation/info/UserAddress.vue'),
            },
            {
                path: '/userInfomation/card',
                name: 'card',
                component: () => import('@/views/userInfomation/info/UserCard.vue'),
            }
        ]
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('@/views/products/Products.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
