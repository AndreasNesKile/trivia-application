<template>
    <v-app-bar dark dense class="trivia-navbar">
        <v-toolbar-title class="hidden-sm-and-down trivia-logo"
            >Trivia Quiz</v-toolbar-title
        >
        <v-toolbar-items>
            <v-btn text to="/">Game Menu</v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped>
.trivia-navbar {
    border-bottom: 2px solid #c77d4e;
    box-shadow: none;
    background-color: #212529 !important;
}

.main-content {
    height: calc(100vh - 100px);
}

.trivia-logo {
    margin-right: 10px;
}
</style>
