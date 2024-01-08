<script setup>
import { computed } from 'vue';

const props = defineProps({
    fields: {
        type: Object,
        required: true,
    },
});

/* This function checks to see which settings are different from their default values and prints them if so */
const settingsWithChanges = computed(() => {
    const changes = {};
    Object.entries(props.fields).forEach(([groupKey, group]) => {
        Object.entries(group).forEach(([key, setting]) => {
            // Ensure setting.value is converted from "true"/"false" strings to boolean.
            // Proceed only if there's a meaningful change to record.
            if (setting.value !== setting.default && setting.settingProperty) {
                const parts = setting.settingProperty.split('.');
                let nestedObject = changes;
                if (setting.value === "true") setting.value = true;
                if (setting.value === "false") setting.value = false;

                parts.forEach((part, index) => {
                    if (index === parts.length - 1) {
                        nestedObject[part] = setting.value;
                    } else {
                        nestedObject[part] = nestedObject[part] || {};
                        nestedObject = nestedObject[part];
                    }
                });
            }
        });
    });
    return changes;
});

</script>

<template>
    <div>
        <div class="plugin-settings-wrapper">
            <div class="instructions">
                <h4>
                    Footer Code Injection
                </h4>
                <p>Copy & paste the plugin settings into your <em style="color:white">Website » Website Tools » Code
                        Injection » Footer</em> area <em>above</em> the BlogBanner installation &lt;script>.</p>
            </div>
            <div class="output">
                <pre><code class="language-html">&lt;script>
window.wmBlogStyle1Settings = {{ settingsWithChanges }}
&lt;/script></code></pre>
            </div>
        </div>
    </div>
</template>

<style scoped>
.instructions {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
}

.plugin-settings-wrapper {
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
    margin: 0;
    margin-bottom: 8px;
}</style>
