<template>
  <TheTitle class="text-brand-primary">Dieta Certa</TheTitle>
  <div class="my-4">
    <Text class="text-center text-brand-primary h5">
      Olá <span class="text-danger">{{ username }}</span>!<br />
      Esperamos que tenha uma boa experiência em nosso site. <br />O DietaCerta
      agradece sua participação
    </Text>
  </div>
  <DashboardMenu  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const username = "";
    return { username, ...useDisclosure() };
  },
});
</script>

