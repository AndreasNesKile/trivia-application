<template>
  <div>
    <v-container v-if="!quizFinished">
      <v-progress-linear striped stream height="40px" :value="countDown * 10"></v-progress-linear>
      <quiz-question v-on:answer="updateGamePlay" :question="questions[currentQuestionIndex]" />
    </v-container>

    <v-container v-else>
      <game-over :score="score" :answeredQuestions="answeredQuestions" />
      <br />
      <router-link to="/">
        <v-btn class="primary">Play again?</v-btn>
      </router-link>
    </v-container>
  </div>
</template>

<script>
import QuizQuestion from "./QuizQuestion";
import GameOver from "./GameOver";
import toastr from "toastr";
import axios from "axios";

export default {
  name: "quiz-main-page",
  components: {
    "quiz-question": QuizQuestion,
    "game-over": GameOver
  },

  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      countDown: 10,
      answeredQuestions: []
    };
  },

  methods: {
    randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    updateGamePlay(event) {
      this.answeredQuestions.push(event);
      this.currentQuestionIndex++;
      if (this.quizFinished) {
        if (event.selectedAnswer === event.correctAnswer) {
          this.score += 10;
        }
      }
      this.countDown = 10;
    },
    handleTimeBar(event) {
      console.log(event.target);
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    }
  },
  computed: {
    currentScore: function() {
      return this.score;
    },
    currentTimer: function() {
      return this.countDown;
    },
    quizFinished() {
      return this.currentQuestionIndex == this.questions.length;
    }
  },

  mounted() {
    let numberOfQuestions = this.randomIntFromInterval(2, 3);
    this.currentQuestionIndex = 0;

    axios
      .get(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
      .then(response => {
        this.questions = response.data.results;
        if (this.questions) {
          this.questions.forEach(question => {
            this.answers.push(
              ...question.incorrect_answers,
              question.correct_answer
            );
          });
        }
      })
      .catch(error => {
        toastr.error("ERROR", `Could not fetch questions from API: ${error}`);
      });
    this.countDownTimer();
  },
  watch: {
    countDown: function() {
      if (!this.quizFinished) {
        if (this.countDown == 0) {
          this.currentQuestionIndex++;
          this.countDown = 10;
          this.countDownTimer();
        }
      }
    }
  }
};
</script>

<style></style>
