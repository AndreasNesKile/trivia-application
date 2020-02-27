<template>
  <v-container>
    <h1 style="color: white">GAME OVER</h1>
    <br />
    <br />
    <h2 style="color: white">You received a total score of: {{ setScore }} / {{ setMaxScore}}</h2>
    <br />

    <quiz-results :answeredQuestions="setAnsweredQuestions" />

    <br />
    <v-btn class="primary">
      <router-link class="router-link white--text" to="quiz">Play again</router-link>
    </v-btn>
  </v-container>
</template>

<script>
import QuizResults from "./QuizResults";

export default {
  name: "game-over",
  components: {
    "quiz-results": QuizResults
  },
  data() {
    return {
      questions: []
    };
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
  },

  watch: {
    answeredQuestions: function(newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      } else {
        this.questions = this.$props.answeredQuestions;
      }
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