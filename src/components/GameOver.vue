<template>
  <v-container>
    <h1 style="color: white">RESULTS</h1>
    <br />
    <br />
    <h2 style="color: white">You received a total score of: {{ setScore }} / {{ setMaxScore}}</h2>
    <br />

    <quiz-results :answeredQuestions="setAnsweredQuestions" />

    <v-divider dark></v-divider>
    <br />
    <router-link class="router-link white--text" to="/">
      <v-btn class="primary">Play again</v-btn>
    </router-link>
  </v-container>
</template>

<script>
import QuizResults from "./QuizResults";

export default {
  name: "game-over",
  components: {
    "quiz-results": QuizResults
  },

  computed: {
    setScore() {
      return this.$route.params.score;
    },
    setMaxScore() {
      return this.$route.params.maxScore;
    },
    setAnsweredQuestions() {
      return this.$route.params.answeredQuestions;
    }
  }
};
</script>

<style scoped>
.card-option {
  background-color: green;
}

.router-link {
  text-decoration: none !important;
}
</style>