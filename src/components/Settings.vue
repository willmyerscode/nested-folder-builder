<script setup>
import FieldGroup from './FieldGroup.vue';
import { computed } from 'vue';
import SettingsHeader from './SettingsHeader.vue';
import PluginSettings from './PluginSettings.vue'
import PluginStyles from './PluginStyles.vue';

const emit = defineEmits(['page-selected', 'toggleNav'])

const changePage = (page) => {
  emit('page-selected', page);
}

const toggleNav = () => {
  emit('toggleNav');
}

const props = defineProps({
    settings: {
        type: Object,
        required: true,
    },
    fields: {
        type: Object,
        required: true,
    },
    currentPage: {
        type: String
    }
})

function resolvePath(path, obj) {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}

const filteredFields = computed(() => {
    const result = {};
    Object.entries(props.settings).forEach(([groupName, group]) => {
        Object.entries(group.fields).forEach(([fieldKey, fieldData]) => {
            if (checkCondition(fieldData.condition, props.settings)) {
                if (!result[groupName]) result[groupName] = { title: group.title, fields: {} };
                result[groupName].fields[fieldKey] = fieldData; 
            }
        });
    });
    return result;
});

const checkCondition = (condition, settings) => {
    if (!condition) return true;  

    const fieldValue = resolvePath(condition.field, settings).value;

    switch (condition.operator) {
        case "==": return fieldValue == condition.value;
        case "!==": return fieldValue !== condition.value;
        case ">=": return fieldValue >= condition.value;
        case ">": return fieldValue > condition.value;
        case "<=": return fieldValue <= condition.value;
        case "<": return fieldValue < condition.value;
        default: return true; 
    }
}


</script>


<template>
    <div class="settings-wrapper">
        <SettingsHeader @page-selected="changePage" @toggleNav="toggleNav" :currentPage="currentPage"/>
        <div class="form-items">
            <div v-for="(group, index) in filteredFields" :key="index" class="field-group">
                <FieldGroup :group="group" />
            </div>
        </div>
        <!--<PluginSettings class="plugin-settings" :fields="fields" />-->
        <PluginStyles class="plugin-styles" :fields="fields" />
    </div>
</template>

<style scoped>
.field-group {
    margin-bottom: 36px;
}
.plugin-settings{
    margin: 34px 0;
}
.plugin-styles{
    margin: 34px 0;
}
</style>