<script setup lang="js">
    import { ref, watch } from 'vue'

    // holds the search text
    const query = ref('')

    // will emit the search event when user types
    const emit = defineEmits(['search'])

    // clean up the search text
    const clear = () => {
        query.value = ''
    }

    // we have the clear function, thats why we are storing the search inside the query ref
    // then clear can set this to empty string to clear the search text
    // to emit all these changes with search event
    // we are watching the query ref and emitting the search event on every change
    watch(query, (value) => emit('search', value))
</script>
<template>
    <div class="search">
        <font-awesome-icon class="icon" icon="magnifying-glass" />
        <input type="text" placeholder="Search for a house" v-model="query" />
        <button v-if="query.length > 0" @click="clear()">
            <font-awesome-icon icon="circle-xmark" />
        </button>
    </div>
</template>

<style lang="css" scoped>
    .search {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        border-radius: 8px;
        padding: 10px 20px;
        gap: 10px;
        background-color: var(--color-tertiary);
    }

    .search input {
        background-color: transparent;
        border: none;
        flex: 1;
    }

    .search button {
        background: transparent;
        border: none;
    }

    .search .icon {
        color: var(--color-quaternary);
    }

    .search input:focus {
        outline: none;
    }
</style>
