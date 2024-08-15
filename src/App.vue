<script setup>
import { RouterView } from 'vue-router'
import BaseModal from './components/BaseModal.vue'
import BaseNav from './components/BaseNav.vue';
</script>

<template>
    <BaseNav />
    <div class="app">
        <div class="app-body">
            <RouterView />
        </div>
    </div>
    <BaseModal />
</template>



<style lang="css">
.app {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: visible;
}

.app .app-body {
    width: var(--desktop-content-width);
    margin-bottom: 20px;
}

@media (max-width:767px) {
    .app .app-body {
        width: 100%;
        margin-bottom: 100px;
    }
}
</style>
