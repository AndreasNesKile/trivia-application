<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-card class="start-game-card" raised>
        <v-card-title class="title justify-center">You want to play a game?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary start-quiz-btn" @click="startQuiz()">Start Game!</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "game-menu",
  methods: {
    startQuiz() {
      this.$router.push({ path: "quiz" });
    }
  }
};
</script>

<style scoped>
.start-game-card {
  height: 10%;
  width: 30%;
}

.start-quiz-btn {
  margin: 10px 10px;
}
</style>
