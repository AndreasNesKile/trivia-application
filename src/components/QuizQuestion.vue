<template>
  <v-card>
    <v-row>
      <v-col lg="12">
        <h4 v-html="question.category"></h4>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <v-col>
        <span v-html="question.question"></span>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-card-text>
      <v-row>
        <v-col v-for="(answer,index) in answers" :key="index" xl="6" md="6" l="6" sm="12" xs="12">
          <v-card
            :disabled="!isActive"
            class="quiz-card-container elevation-5 answer-card"
            :id="'answer-option-' + question"
            @click="sendAnswer($event)"
          >
            <v-card-text v-html="answer"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    question: {
      type: Object
    }
  },
  data() {
    return {
      answers: [],
      selectedAnswer: "",
      answerFromUser: {},
      correctAnswer: "",
      isActive: true
    };
  },

  methods: {
    sendAnswer(event) {
      this.isActive = false;
      this.selectedAnswer = event.target.innerText;
      this.answerFromUser = {
        question: this.question.question,
        options: this.answers,
        selectedAnswer: this.selectedAnswer,
        correctAnswer: this.correctAnswer,
        incorrectAnswers: this.question.incorrect_answers,
        hasAnswered: true
      };

      this.$emit("answer", this.answerFromUser);
    }
  },

  created() {
    this.answers = [
      ...this.question.incorrect_answers,
      this.question.correct_answer
    ];
    this.answers.sort();
    this.correctAnswer = this.question.correct_answer;
  },

  watch: {
    question: function() {
      this.answers = [
        ...this.question.incorrect_answers,
        this.question.correct_answer
      ];
      this.answers.sort();
      this.correctAnswer = this.question.correct_answer;
      this.hasAnswered = false;
      this.isActive = true;
    }
  }
};
</script>

<style scoped>
.quiz-card-container:hover {
  background-color: #d3d3d3;
  cursor: pointer;
}
</style>
