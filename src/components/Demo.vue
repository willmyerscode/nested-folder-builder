<script setup>
import { computed, onMounted, watch } from 'vue';
import demo from '../demoPage.js';

//const proxyUrl = 'http://localhost:3000';
const proxyUrl = 'https://proxy.will-myers.com'


const props = defineProps({
    fields: {
        type: Object,
        required: true,
    }
});

const url = `${proxyUrl}/proxy?targetUrl=` + demo;
console.log('demo: ', demo)
console.log('url: ', url)

const stylesWithChanges = computed(() => {
    let str = '#header {';
    Object.entries(props.fields).forEach(([groupKey, group]) => {
        Object.entries(group).forEach(([key, setting]) => {
            if (setting.value !== setting.default && setting.customProperty) {
                str += `\n  ${setting.customProperty}: ${setting.value}${setting.unit ? setting.unit : ''};`
            }
        });
    });
    str += `
}`;
    return str
});
const sendMessage = (message) => {
    const iframe = document.querySelector('iframe').contentWindow;
    iframe.postMessage(message, url);
}

// Watch each field for changes
Object.entries(props.fields).forEach(([groupKey, group]) => {
    Object.entries(group).forEach(([fieldKey, field]) => {
        watch(() => field.value, (newValue, oldValue) => {
            if (field.onChange && newValue !== oldValue) {
                const message = field.onChange(props.fields);
                if (message) sendMessage(message);
            }
            if (field.customProperty && newValue !== oldValue) {
                const details = stylesWithChanges.value;
                const message = { 
                    type: 'addStylesheet', 
                    id: 'builder',
                    details:  details,
                };
                sendMessage(message);
            }
        });
    });
});
   
const onLoadHandler = () => {
    const details = `
    
    `;
    const message = { 
        type: 'executeScript', 
        id: 'builder',
        details:  details,
    };
    sendMessage(message);
}

</script>

<template>
    <iframe :src="url" @load="onLoadHandler"></iframe>
</template>

<style scoped>
iframe {
    min-height: 100vh;
}
</style>