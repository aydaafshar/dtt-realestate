<script setup>
import { RouterView } from 'vue-router'
import BaseModal from './components/BaseModal.vue'
import BaseNav from './components/BaseNav.vue';
</script>

<template>
    <BaseNav />
    <RouterView />
    <BaseModal />
</template>
