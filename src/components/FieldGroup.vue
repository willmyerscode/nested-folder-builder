<script setup>
import Dropdown from './settingElements/Dropdown.vue'
import TextInput from './settingElements/TextInput.vue'
import Range from './settingElements/Range.vue'
import Checkbox from './settingElements/Checkbox.vue'

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
    <div v-if="group.description" class="description">
        <p>{{ group.description }}</p>
    </div>
    <div class="items">
        <div v-for="item in group.fields">
            <TextInput v-if="item.type == 'input'" :item="item" class="field"/>
            <Dropdown v-if="item.type == 'dropdown'" :item="item" class="field"/>
            <Range v-if="item.type == 'range'" :item="item" class="field"/>
            <Checkbox v-if="item.type == 'checkbox'" :item="item" class="field"/>
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
.description {
    font-size: 13px;
}
</style>