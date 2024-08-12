<script setup>
import { useRouter } from 'vue-router';
import BaseIconButton from './BaseIconButton.vue'

const router = useRouter()
const props = defineProps({ id: Number })
const openRemoveConfirmationModal = () => { }

</script>


<template>
    <div class="house-actions">
        <BaseIconButton icon="pen" variant="primary" @click="router.push(`/house/${props.id}/edit`)" />
        <BaseIconButton icon="trash" variant="secondary" @click="openRemoveConfirmationModal()" />
    </div>
</template>

<style lang="css">
.house-actions {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>