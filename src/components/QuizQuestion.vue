<template>
  <v-card>
    <v-card-title justify-center>{{ question.question }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-for="(answer,index) in answers" :key="index" xl="6" md="6" l="6" sm="12" xs="12">
          <v-card class="quiz-card-container elevation-3" @click="sendAnswer">
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
    question: {}
  },
  data() {
    return {
      answers: []
    };
  },

  methods: {
    sendAnswer() {
      this.$emit("answered");
    }
  },

  mounted() {
    this.answers = [
      ...this.question.incorrect_answers,
      this.question.correct_answer
    ];
  },

  watch: {
    question: () => {
      this.answers = [
        ...this.question.incorrect_answers,
        this.question.correct_answer
      ];
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
