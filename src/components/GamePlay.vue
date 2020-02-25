<template>
  <v-container>
    <quiz-question
      v-if="questions.length > 0"
      v-on:answered="nextQuestion"
      :question="questions[currentQuestionIndex]"
      @sendAnswer="handleAnswerFromUser"
    />
  </v-container>
</template>

<script>
import QuizQuestion from "./QuizQuestion.vue";
import toastr from "toastr";

import axios from "axios";

export default {
  name: "quiz-main-page",
  components: {
    "quiz-question": QuizQuestion
  },
  data() {
    return {
      questions: [],
      currentQuestionIndex: {
        type: Number,
        default: 0
      },
      score: 0
    };
  },

  methods: {
    handleAnswerFromUser: e => {
      console.log("Parent:" + e);
    },
    randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    nextQuestion() {
      this.currentQuestionIndex++;
    }
  },

  mounted() {
    let numberOfQuestions = this.randomIntFromInterval(10, 20);

    axios
      .get(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
      .then(response => {
        this.questions = response.data.results;
      })
      .catch(error => {
        toastr.error("ERROR", "Could not fetch questions from API", error);
      });
    this.currentQuestionIndex = 0;
  }
};
</script>

<style></style>
