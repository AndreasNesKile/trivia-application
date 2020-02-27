<template>
  <v-app-bar dark dense app class="red trivia-navbar">
    <v-toolbar-title class="hidden-sm-and-down trivia-logo">Trivia Quiz</v-toolbar-title>
    <v-toolbar-items>
      <router-link to="/" class="router-link">
        <v-btn class="menu-button outline">Menu</v-btn>
      </router-link>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
.trivia-navbar {
  border-bottom: 2px solid #c77d4e;
  box-shadow: none;
}

.main-content {
  height: calc(100vh - 100px);
}

.trivia-logo {
  margin-right: 10px;
}

.menu-button {
  margin-top: 6px;
}

.router-link {
  text-decoration: none !important;
}
</style>
