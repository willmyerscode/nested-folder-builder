<script setup>
import Dropdown from './settingElements/Dropdown.vue'
import TextInput from './settingElements/TextInput.vue'
import Range from './settingElements/Range.vue'

const props = defineProps({
    group: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="title">
        {{ group.title }}
    </div>
    <div class="items">
        <div v-for="item in group.fields">
            <TextInput v-if="item.type == 'input'" :item="item" class="field"/>
            <Dropdown v-if="item.type == 'dropdown'" :item="item" class="field"/>
            <Range v-if="item.type == 'range'" :item="item" class="field"/>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-size: .7rem;
    text-transform: uppercase;
    font-weight: 600;
    opacity: .6;
    letter-spacing: 1px;
}
</style>