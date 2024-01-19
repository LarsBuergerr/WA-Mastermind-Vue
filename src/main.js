import { createApp } from 'vue';
import App from './App.vue';
import router from './router/';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "jquery/dist/jquery.min.js";
import './registerServiceWorker';

export const SERVER_URL = "https://deploy-wa-mastermind.koyeb.app";

export async function post(url){
  const req = SERVER_URL + url;
  console.log("[POST] request resource: " + req);
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
  console.log("[GET] request resource: " + req);
  return await fetch(req, {
    method: 'GET',
    headers: {
      'Accept': 'application/json */*',
      'Content-Type': 'application/json'
    },
  }).then(response => response.json());
}

// Set the title of the page
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Mastermind Online';
  next();
});

createApp(App).use(router).mount('#app');
