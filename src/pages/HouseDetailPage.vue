<template>
    <div> detail {{ route.params['id'] }}</div>
</template>

<script setup lang="js">
import { useRoute } from 'vue-router';

const route = useRoute()
</script>
