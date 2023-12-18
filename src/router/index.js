import { createRouter, createWebHistory }   from 'vue-router';
import Home                                 from '../views/Home.vue';
import About                                from '../views/About.vue';
import Help                                 from '../views/Help.vue';
import CreateMultiplayer                    from '../views/CreateMultiplayer.vue';
import JoinMultiplayer                      from '../views/JoinMultiplayer.vue';
import Multiplayer                          from '../views/Multiplayer.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/help",
      name: "help",
      component: Help,
    },
    {
      path: "/game_multiplayer/createMultiplayer",
      name: "createMultiplayer",
      component: CreateMultiplayer,
    },
    {
      path: "/game_multiplayer/joinMultiplayer",
      name: "joinMultiplayer",
      component: JoinMultiplayer,
    },
    {
      path: "/game_multiplayer/multiplayer",
      name: "multiplayer",
      component: Multiplayer,
    },
  ],
})

export default router