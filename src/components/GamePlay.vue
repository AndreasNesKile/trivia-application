<template>
    <v-container>
        <!-- <v-col
                v-for="(currentQuestion, index) in questions"
                :key="currentQuestion + index"
            > -->
        <quiz-question :question="questions[0]" />
        <!-- </v-col> -->
    </v-container>
</template>

<script>
import QuizQuestion from "./QuizQuestion.vue";
import toastr from "toastr";

import axios from "axios";

export default {
    name: "quiz-main-page",
    components: {
        "quiz-question": QuizQuestion
    },
    data() {
        return {
            questions: []
        };
    },

    mounted() {
        axios.get("https://opentdb.com/api.php?amount=20").then(response =>
            (this.questions = response.data.results).catch(error => {
                toastr.error(
                    "ERROR",
                    "Could not fetch questions from API",
                    error
                );
            })
        );
    }
};
</script>

<style></style>
