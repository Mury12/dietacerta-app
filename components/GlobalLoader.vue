<template>
    <transition name="fade" mode="out-in">
        <div class="loader d-flex justify-content-center align-items-center flex-column" v-if="isLoading">
            <div class="loading-icon">
                <Loading />
            </div>
            {{ text }}
        </div>
    </transition>
</template>

<script lang="ts" setup>

const isLoading = useGlobalLoader();
const text = useLoadingText();
const defaultText = text.value;

watch(isLoading, (n) => {
    if (!n) text.value = defaultText
});

</script>
<style scoped>
.loader {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.325);
    z-index: 10;
}
</style>
