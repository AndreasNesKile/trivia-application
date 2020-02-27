<template>
  <div>
    <h1 style="color: white">GAME OVER</h1>
    <br />
    <br />
    <h2 style="color: white">You received a total score of: {{ this.$props.score }} / 100</h2>
    <br />
    <v-timeline dark>
      <v-timeline-item
        light
        v-for="(currentQuestion, index) in answeredQuestions"
        :key="index"
        fill-dot
        :icon="index = 1"
      >
        <v-card class="elevation-2" style="color: grey">
          <v-card-title class="headline" v-html="currentQuestion.questions"></v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(option, optionIndex) in currentQuestion.options"
                :key="optionIndex"
                xl="6"
                md="6"
                l="6"
                sm="12"
                xs="12"
              >
                <v-card>
                  <v-card-text v-html="option" :class="setCardClass(option, index, optionIndex)"></v-card-text>
                </v-card>
              </v-col>
              <v-col>
                Your Answer:
                <h2 v-html="currentQuestion.selectedAnswer"></h2>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
    answeredQuestions: Array
  },
  data() {
    return {
      questions: [],
      correctAnswer: ""
    };
  },

  computed: {
    setCorrectAnswer: function(index) {
      return this.questions[index].correctAnswer;
    }
  },

  methods: {
    setCardClass: function(option, index) {
      if (option == this.questions[index].correctAnswer) {
        return "card-option";
      }
    }
  },

  created() {
    this.questions = this.answeredQuestions;
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
</style>