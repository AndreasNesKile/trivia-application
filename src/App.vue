<template>
  <v-app>
    <app-navbar />

    <v-content>
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer class="app red text-center white--text justify-center">
      <span>© 2020 — Andreas Nes Kile</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppNavBar from "./components/AppNavBar";

export default {
  name: "App",
  components: {
    "app-navbar": AppNavBar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #1e1e1e;
}

.trivia-navbar {
  border-bottom: 2px solid #c77d4e;
  box-shadow: none;
  background-color: #212529 !important;
}
</style>
