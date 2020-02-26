<template>
  <v-container v-if="questions.length > 0">
    <v-progress-linear striped stream height="40px" :value="countDown * 10"></v-progress-linear>
    <quiz-question v-on:answer="validateQuestion" :question="questions[currentQuestionIndex]" />
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
      currentQuestionIndex: 0,
      score: 0,
      hasAnswered: false,
      countDown: 10,
      answeredQuestions: []
    };
  },

  methods: {
    randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    validateQuestion(event) {
      if (event.selectedAnswerIndex === event.correctAnswerIndex) {
        this.score += 10;
      }
      this.currentQuestionIndex++;
      this.countDown = 10;
      console.log(event);
    },
    checkCorrectAnswer() {
      if (this.selectedAnswer == this.correctAnswer) {
        this.colorOfAnswer = "success";
      } else {
        console.log();
      }
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
    }
  },

  mounted() {
    let numberOfQuestions = this.randomIntFromInterval(10, 20);
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
          this.correctAnswer = this.answers.indexOf(
            this.question.correct_answer
          );
        }
      })
      .catch(error => {
        toastr.error("ERROR", "Could not fetch questions from API", error);
      });
    this.countDownTimer();
  }
};
</script>

<style></style>
