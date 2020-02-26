<template>
  <v-card>
    <v-card-title v-if="question">
      <span>{{ question.question}}</span>
      <v-spacer></v-spacer>
      <h4>{{question.category}}</h4>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-for="(answer,index) in answers" :key="index" xl="6" md="6" l="6" sm="12" xs="12">
          <v-card
            :disabled="!isActive"
            class="quiz-card-container elevation-3 disabled answer-card"
            :id="'answer-option-' + question"
            @click="sendAnswer($event)"
          >
            <v-card-text>{{ answer }}</v-card-text>
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
      selectedAnswerIndex: 0,
      answerFromUser: {},
      correctAnswer: "",
      isActive: true
    };
  },

  methods: {
    sendAnswer(event) {
      // let backgroundColor = "";

      // event.target.innerText == this.correctAnswer
      //   ? (backgroundColor = "green")
      //   : (backgroundColor = "red");

      // event.srcElement.style.backgroundColor = backgroundColor;
      this.isActive = false;

      this.selectedAnswerIndex = this.answers.indexOf(event.target.innerText);

      this.answerFromUser = {
        selectedAnswerIndex: this.selectedAnswerIndex,
        correctAnswerIndex: this.answers.indexOf(this.correctAnswer),
        answers: this.answers,
        hasAnswered: true,
        correctAnswer: this.correctAnswer,
        questions: this.question
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
