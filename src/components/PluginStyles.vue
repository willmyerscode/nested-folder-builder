<script setup>
import { computed } from 'vue';

const props = defineProps({
    fields: {
        type: Object,
        required: true,
    }
})

const stylesWithChanges = computed(() => {
    let str = '';
    Object.entries(props.fields).forEach(([groupKey, group]) => {
        Object.entries(group).forEach(([key, setting]) => {
            if (setting.value !== setting.default && setting.customProperty) {
                str += `\n  ${setting.customProperty}: ${setting.value}${setting.unit ? setting.unit : ''};`
            }
        });
    });
    return str;
});

</script>

<template>
    <div>
        <div class="plugin-styles-wrapper">
            <div class="instructions">
                <h4>
                    Plugins Styles
                </h4>
                <p>Place these styles into your <em style="color:white">Websites » Website Tools » Custom CSS</em> area.</p>
            </div>
            <div class="output">
<pre><code class="language-css">#header { {{ stylesWithChanges }}
}</code></pre>
            </div>
        </div>
    </div>
</template>

<style scoped>
.instructions {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
}

.plugin-styles-wrapper {
    max-width: 75ch;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
}
.instructions h4 {
    font-size: 19px;
    color: white;
    font-weight: 600;
    letter-spacing: 1px;
    margin: 0;
    margin-bottom: 8px;
}
.instructions p {
    font-size: 13px;
    margin:0;
    margin-bottom: 8px;
}
</style>
