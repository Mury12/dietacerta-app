<template>
  <div class="header bg-brand-primary px-5">
    <BRow class="h-100 align-items-center">
      <BCol cols="12" lg="10" class="text-white fa-2x ">
        <!-- <BButton :variant="btnClass" @click="toggleLayout">Layout</BButton> -->
        Dieta Certa
      </BCol>
      <BCol cols="12" lg="2" class="d-flex justify-content-end">
        <div class="
            profile-img
            hover
            pointer
            d-flex
            justify-content-center
            align-items-center
            bg-warning
            user-select-none
            text-primary
          " @click="logout">
          {{ userFirstLetter }}
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<script lang="ts" setup>
const layout = useLayout();
const user = useComputedUser();
const LocalStorage = useLocalStorage();
const userFirstLetter = computed(() => user.value?.name.charAt(0).toUpperCase() ?? '');

const btnClass = computed(() => {
  return layout.value === "custom" ? "danger" : "info";
});

function toggleLayout() {
  layout.value = layout.value === "custom" ? "default" : "custom";
}

function logout() {
  user.value = undefined
  LocalStorage.destroy();
  window.location.replace('/login');
}
</script>

<style scoped>
.profile-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  font-size: 2em;
  font-family: "Courier New", Courier, monospace;
}

.header {
  width: 100%;
}
</style>
