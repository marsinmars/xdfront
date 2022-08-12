import {createApp} from 'vue';
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import store from "./store";
import axios from 'axios';
import {Swipe, SwipeItem} from 'vant';

//url = base url + request url
axios.defaults.baseURL = "http://127.0.0.1:8089";
axios.defaults.timeout = 5000;


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', name: 'Home', component: () => import( "@/views/Home/Home")},
        {path: '/coursedetail', name: 'CourseDetail', component: () => import('@/views/CourseDetail/CourseDetail')},
        {path: '/login', name: 'Login', component: () => import("@/views/Login/Login")},
        {path: '/order', name: 'Order', component: () => import("@/views/Order/Order")},
        {path: '/pay', name: 'Pay', component: () => import("@/views/Pay/Pay")},
        {path: '/personal', name: 'Personal', component: () => import("@/views/Personal/Personal")},
        {path: '/register', name: 'Register', component: () => import("@/views/Register/Register")},
    ]
})

const app = createApp(App)
app.use(router, store, axios, Swipe, SwipeItem)
app.mount('#app');
