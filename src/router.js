import Vue from "vue";
import Router from "vue-router";

import GamePlay from "./components/GamePlay";
import GameMenu from "./components/GameMenu";
import GameOver from "./components/GameOver";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "menu",
			component: GameMenu
		},
		{
			path: "/quiz",
			name: "quiz",
			component: GamePlay
		},
		{
			path: "/results",
			name: "results",
			component: GameOver
		}
	]
});
