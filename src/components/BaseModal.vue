<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { useModal } from '../stores'
const store = useModal()


</script>

<template>
    <div v-if="store.isVisible" class="modal">
        <div class="modal-body">
            <h3>{{ store.state.title }}</h3>
            <div class="description">
                <p v-for="line in store.state.description">{{ line }}</p>
            </div>
            <BaseButton variant="primary" @click="store.close(true)">Yes, DELETE</BaseButton>
            <BaseButton variant="secondary" @click="store.close(false)">Go Back</BaseButton>
        </div>
    </div>
</template>



<style lang="css" scoped>
.modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal .modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    background-color: #fff;
    padding: 10px 20px
}

.modal .modal-body p {
    padding: 0;
    margin: 0;
    text-align: center;
}

.modal .modal-body .description {
    margin-bottom: 20px
}

.modal .modal-body button {
    width: 70%;
}
</style>