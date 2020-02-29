<template v-if="isReady">
  <v-container class="fill height" v-if="questions.length > 0">
    <v-progress-linear striped stream height="40px" :value="countDown * 10"></v-progress-linear>
    <quiz-question v-on:answer="updateGamePlay" :question="questions[currentQuestionIndex]" />
  </v-container>
</template>

<script>
import QuizQuestion from "./QuizQuestion";
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
      answers: [],
      currentQuestionIndex: 0,
      score: 0,
      countDown: 10,
      answeredQuestions: [],
      isReady: false
    };
  },

  methods: {
    updateGamePlay(event) {
      this.answeredQuestions.push(event);
      this.currentQuestionIndex++;
      if (event.selectedAnswer === event.correctAnswer) {
        this.score += 10;
      }
      this.countDown = 10;
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },

    hasAnsweredQuestion() {
      if (!this.answeredQuestions[this.currentQuestionIndex]) {
        this.answeredQuestions.push({
          question: this.questions[this.currentQuestionIndex].question,
          category: this.questions[this.currentQuestionIndex].category,
          options: [
            this.questions[this.currentQuestionIndex].correct_answer,
            ...this.questions[this.currentQuestionIndex].incorrect_answers
          ],
          didAnswer: false,
          correctAnswer: this.questions[this.currentQuestionIndex]
            .correct_answer
        });
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
    },
    numberOfQuestions: function() {
      return this.$route.params.numberOfQuestions;
    }
  },

  mounted() {
    this.currentQuestionIndex = 0;
    axios
      .get(`https://opentdb.com/api.php?amount=${this.numberOfQuestions}`)
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
        this.isReady = true;
      })
      .catch(error => {
        console.log(error);
        toastr.error("ERROR", `Could not fetch questions from API: ${error}`);
      });
    this.countDownTimer();
  },

  watch: {
    countDown: function() {
      if (!this.quizFinished && this.countDown == 0) {
        this.hasAnsweredQuestion();
        this.currentQuestionIndex++;
        this.countDown = 10;
        this.countDownTimer();
      }

      if (this.quizFinished) {
        this.$router.push({
          name: "results",
          params: {
            questions: this.answeredQuestions,
            score: this.score,
            maxScore: this.numberOfQuestions * 10,
            answeredQuestions: this.answeredQuestions
          }
        });
      }
    }
  }
};
</script>

<style>
.trivia-navbar {
  border-bottom: 2px solid #c77d4e;
  box-shadow: none;
}
</style>
