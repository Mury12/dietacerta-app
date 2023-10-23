<template>
  <BRow :style="{ gap: '10px' }" class="justify-content-center">
    <div v-for="(meal, idx) in currentMeals" :key="idx" class="food border rounded p-3 position-relative">
      <div class="remove-icon text-danger pointer" @click="remove(idx)">
        <FaIcon icon="trash" />
      </div>
      {{ meal.food.name }} - x{{ meal.stats.amount }}<br />
      <MacroHint :macros="macroToMacroField(meal.stats.macros)" />
    </div>
  </BRow>
</template>

<script lang="ts" setup>
import { GetMealsResponse } from "@/types";
import { apiClient } from "~~/util/ApiClient";
import { macroToMacroField } from "~~/util/macro-to-macro-field";

const { meals = [] } = defineProps<{ meals: GetMealsResponse }>()
const diet = useComputedDiet();

const currentMeals = ref([...meals]);

const isLoading = useGlobalLoader();

async function remove(idx: number) {
  isLoading.value = true;
  try {
    await apiClient.removeMeal(currentMeals.value[idx].id);
    const updatedDiet = await apiClient.fetchDietStats(diet.value.id);
    
    diet.value = updatedDiet;
    currentMeals.value.splice(idx, 1);
  } finally {
    isLoading.value = false;
  }

}

</script>
<style scoped>
.food {
  width: 250px;
}

.food:hover .hover-macros {
  opacity: 1;
}

.remove-icon {
  position: absolute;
  right: 10px;
  top: 5px;
}

.hover-macros {
  width: 300px;
  opacity: 0;
  z-index: -1;
  background-color: black;
}
</style>
