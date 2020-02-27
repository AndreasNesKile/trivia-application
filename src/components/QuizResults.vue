<template v-if="quizQuestions.length > 0">
  <v-timeline dark>
    <v-timeline-item
      light
      v-for="(currentQuestion, index) in quizQuestions"
      :key="index"
      fill-dot
      :icon="(index + 1).toString()"
    >
      <v-card class="elevation-2" style="color: grey">
        <v-card-title style="font-size: 1em" v-html="currentQuestion.question"></v-card-title>
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
                <v-card-text :class="setCardClass(option, index, optionIndex)" v-html="option"></v-card-text>
              </v-card>
            </v-col>
            <v-col>
              Your Answer:
              <h2 v-html="currentQuestion.selectedAnswer" v-if="currentQuestion.didAnswer"></h2>
              <h2 v-else>No answer were given</h2>
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

  data() {
    return {
      quizQuestions: this.answeredQuestions
    };
  },

  beforeMount() {
    this.quizQuestions = this.$route.params.answeredQuestions;
  },

  created: function() {
    if (this.quizQuestions) this.dataLoaded = true;
  },

  methods: {
    setCardClass: function(option, index, optionIndex) {
      console.log(index);
      console.log(optionIndex);
      if (option == this.questions[index].correctAnswer) {
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