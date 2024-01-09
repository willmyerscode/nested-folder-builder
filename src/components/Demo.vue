<script setup>
import { computed, watch } from 'vue';
import demo from '../demo.js';


const props = defineProps({
    fields: {
        type: Object,
        required: true,
    }
});

const url = 'https://wm-proxy.vercel.app/proxy?targetUrl=' + demo;

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
    console.log(message)
    //console.log('demo: ', demo)
    iframe.postMessage(message, 'https://wm-proxy.vercel.app');
    //frame.postMessage(message, "https://woof.willmyerscode.com");
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
</script>

<template>
    <iframe :src="url"></iframe>
</template>

<style scoped>
iframe {
    min-height: 100vh;
}
</style>