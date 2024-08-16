<script setup>
    import { useRouter } from 'vue-router'
    import BaseIconButton from './BaseIconButton.vue'
    import { useHouses, useModal } from '../stores'

    const router = useRouter()
    const modal = useModal()
    const houses = useHouses()
    const props = defineProps({ id: Number })
    const openRemoveConfirmationModal = () => {
        const handleResult = (confirmed) => {
            if (confirmed) {
                houses.remove(props.id).then(() => {
                    router.push('/')
                })
            }
        }
        modal.open(
            'Delete listing',
            [
                'Are you sure you want to delete this listing?',
                'This action cannot be undone.',
            ],
            handleResult
        )
    }
</script>

<template>
    <div class="house-actions">
        <BaseIconButton
            icon="pen"
            size="lg"
            variant="primary"
            @click="router.push(`/house/${props.id}/edit`)"
        />
        <BaseIconButton
            icon="trash"
            size="lg"
            variant="secondary"
            @click="openRemoveConfirmationModal()"
        />
    </div>
</template>

<style lang="css">
    .house-actions {
        display: flex;
        flex-direction: row;
        gap: 5px;
        /* box-sizing: border-box; */
    }
</style>
