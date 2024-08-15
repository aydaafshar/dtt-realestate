<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>


<template>
    <div class="nav">

        <div class="nav-body">
            <img class="nav-logo" src="../assets/logo.png" />
            <RouterLink to="/" class="nav-item" :class="{ selected: route.path !== '/about' }">
                <span>Home</span>
                <font-awesome-icon size="lg" icon="home" />
            </RouterLink>
            <RouterLink to="/about" class="nav-item" :class="{ selected: route.path == '/about' }">
                <span>About</span>
                <font-awesome-icon size="lg" icon="info-circle" />
            </RouterLink>
        </div>
    </div>
</template>


<style lang="css" scoped>
.nav {
    position: sticky;
    top: 0;
    z-index: 100;

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    background: var(--color-background-2);
    box-shadow: var(--shadow);
}

.nav-logo {
    height: 32px;
}

.nav-body {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-height: 30px;
    gap: 30px;
    width: var(--desktop-content-width);
}

.nav-item {
    color: black;
    text-decoration: none;
}

.nav-item.selected {
    color: red;
    font-weight: bold;
}

.nav-item svg {
    display: none;
}

.nav-item span {
    display: block;
}


@media (max-width:767px) {
    .nav {
        position: fixed;
        bottom: 0;
        top: unset;
    }

    .nav-item svg {
        display: block;
    }

    .nav-item span {
        display: none;
    }

    .nav-body .nav-logo {
        display: none;
    }

    .nav-body {
        justify-content: space-evenly;
    }
}
</style>