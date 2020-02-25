import Vue from "vue";
import Router from "vue-router";

import GamePlay from "./components/GamePlay.vue";
import GameMenu from "./components/GameMenu.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: GameMenu
        },
        {
            path: "/quiz",
            name: "quiz",
            component: GamePlay
        }
    ]
});
