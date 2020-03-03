<template>
  <v-card>
    <v-row>
      <v-col>
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
  name: "quiz-question",
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
      questionNumber: 0,
      currentQuestionNumber: 0
    };
  },

  methods: {
    sendAnswer(event) {
      this.answerFromUser = {
        question: this.question.question,
        category: this.question.category,
        options: this.answers,
        selectedAnswer: event.target.innerText,
        correctAnswer: this.correctAnswer,
        incorrectAnswers: this.question.incorrect_answers,
        didAnswer: true
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
    this.correctAnswer = this.$props.question.correct_answer;
    this.hasAnswered = this.$props.hasAnswered;
  },

  watch: {
    question: function() {
      this.answers = [
        ...this.question.incorrect_answers,
        this.question.correct_answer
      ];
      this.answers.sort();
      this.correctAnswer = this.$props.question.correct_answer;
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
