<script setup>
import DemoWrapper from './DemoWrapper.vue';
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    fields: {
        type: Object,
        required: true
    }
});

const content = ref('');
const isLoading = ref(true);
const error = ref(null);

async function fetchContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load page');
        const text = await response.text();
        return text;
    } catch (err) {
        console.error('Error fetching:', err);
        error.value = err.message;
    }
}

async function parseContent(text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.querySelector('#sections');
}

function initSSFunctions() {
    window.Squarespace?.globalInit(Y);
    window.Squarespace?.initializeLayoutBlocks(Y, Y.one(section));
    window.Squarespace?.initializeNativeVideo(Y, Y.one(section));
    window.Squarespace?.initializePageContent(Y, Y.one(section));
    window.dispatchEvent(new Event('wmSyntaxHighlight'))
}

onMounted(async () => {
    if (props.src == 'design') {
        error.value = false;
        isLoading.value = false;
        return;
    }
    isLoading.value = true;
    const url = import.meta.env.DEV ? `/will-myers${props.src}` : props.src;
    const text = await fetchContent(url);
    const section = await parseContent(text);

    if (section) {
        content.value = section.innerHTML;
        isLoading.value = false;
        await nextTick();
        //initSSFunctions()
    } else {
        isLoading.value = false;
        error.value = '#sections not found';
    }
    isLoading.value = false;
});
</script>

<template>
    <div>
        <div v-if="!isLoading && !error">
            <div v-if="src !== 'design' && !isLoading && !error" v-html="content" id="sections" class="sections"></div>
            <DemoWrapper v-else :fields="fields"/>
        </div>
        <div v-if="isLoading && src !== 'design'" class="loading">Loading...</div>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<style> #installation #sections .page-section {
     flex: 1 0 auto;
     margin-right: 200px;
 }

 #installation #sections .page-section .content-wrapper {
     max-width: 767px !important;
 }

 @media(max-width: 1250px) {
     #installation #sections .page-section {
         margin-right: 0px;
     }

     #installation #sections .page-section .content-wrapper {
         max-width: 100% !important;
     }
 }

 #installation pre {
     overflow-x: auto;
     box-sizing: border-box;
 }

 .fluid-engine #installation #sections .sqs-block {
     padding-top: 17px;
     padding-bottom: 17px;
 }
</style>

<style scoped>
.loading {
    display: grid;
    place-items: center;
    min-height: 100vh;
    width: 100%;
}
</style>
