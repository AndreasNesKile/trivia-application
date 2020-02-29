<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-card class="start-game-card" raised>
        <v-alert v-show="invalidNumberOfQuestionsAlertText" color="red">Please pick a valid number!</v-alert>
        <v-card-title class="title justify-center">You want to play a game?</v-card-title>
        <v-card-text>
          <br />
          <v-row justify="center">
            <h3>Choose a number between 10 and 20 questions!</h3>
          </v-row>
          <v-row justify="center">
            <v-col md="3">
              <v-text-field
                v-model="numberOfQuestions"
                light
                width="200px"
                min="10"
                max="20"
                type="number"
                :class="{invalid:numberOfQuestions < 10 || numberOfQuestions > 20}"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary start-quiz-btn" @click="startQuiz()">Start Quiz!</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "game-menu",
  data() {
    return {
      numberOfQuestions: 10,
      invalidNumberOfQuestionsAlertText: ""
    };
  },

  computed: {
    setNumberOfQuestions: function() {
      return this.numberOfQuestions;
    },
    numberOfQuestionsIsValid: function() {
      return this.numberOfQuestions > 9 && this.numberOfQuestions < 20;
    }
  },
  methods: {
    startQuiz() {
      if (this.numberOfQuestionsIsValid) {
        this.$router.push({
          name: "quiz",
          params: { numberOfQuestions: this.setNumberOfQuestions }
        });
      } else {
        this.invalidNumberOfQuestionsAlertText = "Please choose a valid number";
      }
    }
  }
};
</script>

<style scoped>
.start-game-card {
  height: 10%;
  width: 30%;
}

.start-quiz-btn {
  margin: 10px 10px;
}
</style>
