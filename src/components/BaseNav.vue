<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>


<template>
    <div class="nav-container">
        <RouterLink to="/" class="nav" :class="{ selected: route.path !== '/about' }">
            Home
        </RouterLink>
        <RouterLink to="/about" class="nav" :class="{ selected: route.path == '/about' }">
            About
        </RouterLink>
    </div>
</template>


<style lang="css" scoped>
.nav-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-height: 30px;
    gap: 15px
}

.nav {
    color: black
}

.nav.selected {
    color: red;
    font-weight: bold;
}
</style>