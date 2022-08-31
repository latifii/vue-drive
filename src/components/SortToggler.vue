<template>
  <button @click="toggle" class="rounded-button">
    <icon-arrow-up v-if="sort.order === 'asc'" />
    <icon-arrow-down v-else />
  </button>
</template>

<script setup>
import { reactive, defineEmits } from 'vue';

const sort = reactive({
  column: 'name',
  order: 'asc',
});

const emit = defineEmits(['sort-change']);

const toggle = () => {
  sort.order = sort.order === 'asc' ? 'desc' : 'asc';
  emit('sort-change', sort);
};
</script>
