import { createApp } from 'vue';
import App from './App.vue';
import router from './router/';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "jquery/dist/jquery.min.js";

export const SERVER_URL = "http://127.0.0.1:9000/";

export async function post(url){
    const req = SERVER_URL + url;
    console.log(req);
    return await fetch(req, {
        method: 'POST',
        headers: {
            'Accept': 'application/json */*',
            'Content-Type': 'application/json'
        },
        body: ""
    });
}

export async function get(url) {
    const req = SERVER_URL + url;
    console.log(req);
    return await fetch(req, {
        method: 'GET',
        headers: {
            'Accept': 'application/json */*',
            'Content-Type': 'application/json'
        },
    }).then(response => response.json());
}

createApp(App).use(router).mount('#app')
