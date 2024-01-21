import Home                                 from '../pages/Home.vue';
import About                                from '../pages/About.vue';
import Help                                 from '../pages/Help.vue';
import CreateMultiplayer                    from '../pages/CreateMultiplayer.vue';
import JoinMultiplayer                      from '../pages/JoinMultiplayer.vue';
import Multiplayer                          from '../pages/Multiplayer.vue';


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: 'Mastermind Online',
    },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      title: 'Mastermind About',
    },
  },
  {
    path: "/help",
    name: "help",
    component: Help,
    meta: {
      title: 'Mastermind Help',
    },
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
]

export default routes
