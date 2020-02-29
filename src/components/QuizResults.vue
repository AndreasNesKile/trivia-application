<template>
  <v-row>
    <v-col class="hidden-md-and-down"></v-col>
    <v-col xl="6" lg="10">
      <v-timeline dark>
        <v-timeline-item
          light
          v-for="(currentQuestion, index) in setAnsweredQuestions"
          :key="index"
          fill-dot
          color="cyan lighten-1"
          :icon="(index + 1).toString()"
          icon-color="black"
          class="result-question-number"
        >
          <v-row>
            <v-col>
              <v-card class="elevation-2" color="cyan darken-1" style="color: black">
                <v-card-title style="font-size: 1em" justify="center">
                  <v-row>
                    <v-col>
                      <h3 v-html="currentQuestion.category"></h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <span v-html="currentQuestion.question"></span>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-row v-if="currentQuestion.options">
                    <v-col
                      v-for="(option, optionIndex) in currentQuestion.options"
                      :key="optionIndex"
                      xl="6"
                      lg="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-card>
                        <v-card-text
                          :class="setCardClass(option, currentQuestion, index, optionIndex)"
                          v-html="option"
                        ></v-card-text>
                      </v-card>
                    </v-col>
                    <v-row justify="center">
                      <v-col xl="8" lg="8" md="10" sm="10" justify="center">
                        <v-alert
                          v-if="!currentQuestion.didAnswer"
                          dense
                          type="warning"
                        >No answer were given</v-alert>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-col>
    <v-col class="hidden-md-and-down"></v-col>
  </v-row>
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
    setCardClass: function(option, currentQuestion, index) {
      if (option == this.setAnsweredQuestions[index].correctAnswer)
        return "card-option-correct";
      if (
        option != currentQuestion.correctAnswer &&
        option == currentQuestion.selectedAnswer
      )
        return "card-option-wrong";
    }
  }
};
</script>

<style scoped>
.card-option-correct {
  background-color: #388e3c;
}

.card-option-wrong {
  background-color: #e53935;
}

.result-question-number {
  color: white;
}
</style>