<script setup>
import { computed, onMounted, watch } from 'vue';
import demo from '../demoPage.js';

const proxyUrl = 'https://proxy.will-myers.com'
let pluginScriptUrl;
let pluginStylesUrl;
if (window.location.host.includes('localhost')) {
    pluginScriptUrl = window.location.protocol + '//' + window.location.host + '/plugin/index.js'; // Update this to the correct path
    pluginStylesUrl = window.location.protocol + '//' + window.location.host + '/plugin/styles.css'; // Update this to the correct path
} else {
    pluginScriptUrl = 'https://cdn.jsdelivr.net/gh/willmyerscode/nested-folders@1/nested-folders.min.js?t=' + new Date().getTime();
    pluginStylesUrl = 'https://cdn.jsdelivr.net/gh/willmyerscode/nested-folders@1/nested-folders.min.css?t=' + new Date().getTime();
}




const props = defineProps({
    fields: {
        type: Object,
        required: true,
    }
});

const url = `${proxyUrl}/proxy?targetUrl=` + demo;

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
                    details: details,
                };
                sendMessage(message);
            }
        });
    });
});

const onLoadHandler = async () => {
    const styleMessage = {
        type: 'addLink',
        id: 'plugin-styles',
        href: pluginStylesUrl
    };
    const scriptMessage = {
        type: 'addScript',
        id: 'plugin-script',
        src:  pluginScriptUrl
    };
    sendMessage(styleMessage)
    sendMessage(scriptMessage)
}
</script>

<template>
    <iframe :src="url" @load="onLoadHandler" allow-scripts></iframe>
</template>

<style scoped>
iframe {
    min-height: 100vh;
}
</style>