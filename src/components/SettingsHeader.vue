<script setup>
import ChevronDoubleRight from './icons/ChevronDoubleRight.vue';
import ChevronDoubleLeft from './icons/ChevronDoubleLeft.vue';

const props = defineProps({
    currentPage: {
        type: String
    }
})

const emit = defineEmits(['page-selected', 'toggleNav'])

const buttonClicked = (page) => {
  emit('page-selected', page);
}

const handleClick = () => {
    emit('toggleNav')
}

</script>

<template>
    <div class="settings-navigation">
        <div class="back-to-installation">
            <p><a @click="buttonClicked(currentPage)">← Back</a></p>
        </div>
        <div class="toggle-menu">
            <button @click="handleClick" aria-controls="close-tab" aria-selected="true" tabindex="0" class="close">
                <div class="icon-container">
                    <ChevronDoubleLeft />
                </div>
            </button>
            <button @click="handleClick" aria-controls="open-tab" aria-selected="false" tabindex="0" class="open">
                <div class="icon-container">
                    <ChevronDoubleRight />
                </div>
            </button>
        </div>
        <p>Customize your styles however you want, then copy and paste the generated code at the bottom of this panel.</p>
    </div>
</template>

<style>
.builder-wrapper .toggle-menu button {
    border-radius: 4px;
}

.builder-wrapper .toggle-menu button:hover {
    background: #333;
}

.builder-wrapper .toggle-menu button:active {
    background: #444;
}


.builder-wrapper .settings {
    transform: translateX(0px);
    transition: transform 0.3s ease;
}

.builder-wrapper .settings .form-items {
    opacity: 1;
    transition: opacity 0.3s ease;
}

.builder-wrapper .settings+.demo {
    margin-left: 300px;
    transition: margin 0.3s ease;
}

.builder-wrapper .toggle-menu button.open {
    display: none;
}

.builder-wrapper .toggle-menu button.close {
    display: block;
}


.builder-wrapper .settings.closed {
    transform: translateX(-248px);
}

.builder-wrapper .settings.closed .form-items {
    opacity: 0;
}

.builder-wrapper .settings.closed+.demo {
    margin-left: 52px;
}

.builder-wrapper .settings.closed .toggle-menu button.open {
    display: block;
}

.builder-wrapper .settings.closed .toggle-menu button.close {
    display: none;
}
</style>

<style scoped>
.settings-navigation {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0 34px;
}
.settings-navigation > p {
    font-size: 13px;
}

.back-to-installation p{
    margin: 0;
    color: white;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
}
.back-to-installation p:hover a{
    color: var(--blue)
}

.toggle-menu {
    display: flex;
    justify-content: flex-end;
}

.toggle-menu button {
    background: none;
    border: 0;
    color: #fff;
    padding: 0;
    border-radius: 5px;
}

.toggle-menu .icon-container {
    width: 18px;
    padding: 4px;
    height: 18px;
    display: grid;
    place-items: center;
    cursor: pointer;
}
</style>

