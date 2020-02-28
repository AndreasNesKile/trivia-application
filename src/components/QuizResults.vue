<template>
  <v-timeline dark>
    <v-timeline-item
      light
      v-for="(currentQuestion, index) in setAnsweredQuestions"
      :key="index"
      fill-dot
      :icon="(index + 1).toString()"
    >
      <v-card class="elevation-2" style="color: grey">
        <v-card-title style="font-size: 1em" v-html="currentQuestion.question"></v-card-title>
        <v-card-text>
          <v-row v-if="currentQuestion.options">
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
                <v-card-text :class="setCardClass(option, index, optionIndex)" v-html="option"></v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <h1>Your Answer:</h1>
              <h3 v-html="currentQuestion.selectedAnswer" v-if="currentQuestion.didAnswer"></h3>
              <h3 v-else>No answer were given</h3>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: "quiz-results",
  props: {
    answeredQuestions: Array
  },

  computed: {
    setAnsweredQuestions: function() {
      return this.answeredQuestions;
    }
  },

  methods: {
    setCardClass: function(option, index) {
      if (option == this.setAnsweredQuestions[index].correctAnswer) {
        return "card-option";
      }
    }
  }
};
</script>

<style scoped>
.card-option {
  background-color: green;
}

.v-icon {
  color: white;
}
</style>