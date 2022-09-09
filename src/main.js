import {createApp} from 'vue';
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import store from "./store";
import axios from 'axios';
import {Toast, CellGroup, Field, Form, Swipe, SwipeItem, Tab, Tabs} from 'vant';
import 'default-passive-events'

//url = base url + request url
axios.defaults.baseURL = "http://106.15.206.167:8089";
// axios.defaults.baseURL = "http://127.0.0.1:8089";
axios.defaults.timeout = 10000;


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', name: 'Home', component: () => import( "@/views/Home/Home")},
        {path: '/coursedetail', name: 'CourseDetail', component: () => import('@/views/CourseDetail/CourseDetail')},
        {path: '/login', name: 'Login', component: () => import("@/views/Login/Login")},
        {path: '/register', name: 'Register', component: () => import("@/views/Register/Register")},
        {
            path: '/order',
            name: 'Order',
            component: () => import("@/views/Order/Order"),
            meta: {requiresAuth: true}
        },
        {
            path: '/pay',
            name: 'Pay',
            component: () => import("@/views/Pay/Pay"),
            meta: {requiresAuth: true}
        },
        {
            path: '/personal',
            name: 'Personal',
            component: () => import("@/views/Personal/Personal"),
            meta: {requiresAuth: true}
        },
    ]
})
//路由拦截,拦截全部
router.beforeEach((to,from,next)=>{
    let token=localStorage.getItem("token");
    //筛选需要token的路由，匹配route里需要登陆的路径，匹配到为true
    if(to.matched.some(record=>record.meta.requiresAuth)){
        if(token){
            next()
        } else {
            next({path:"/login"})
        }
    } else {
        next();
    }
})

const app = createApp(App)
app.use(router, Toast, store, axios, Swipe, SwipeItem, Tab, Tabs, Form, Field, CellGroup)
app.mount('#app');
