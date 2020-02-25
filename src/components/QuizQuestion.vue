<template>
    <v-card v-if="question.type === 'multiple'">
        <v-card-title justify-center>{{ question.question }}</v-card-title>
        <v-card-text v-for="answer in answers" :key="answer">
            <v-row>
                <v-col>
                    <v-sheet> {{ answer }}</v-sheet>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ["question"],
    data() {
        return {
            answers: []
        };
    },

    watch: {
        question: (newVal, oldVal) => {
            this.answers.push(newVal["correct_answer"]);
            newVal["incorrect_answers"].forEach(answer => {
                this.answers.push(answer);
            });
            this.debouncedGetAnswer();
            console.log(oldVal);
        }
    }
};
</script>

<style scoped></style>
