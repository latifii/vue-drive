<template>
  <button class="btn btn-outline-primary" @click="handleClick">
    <icon-upload /> Upload Files
  </button>
  <input
    type="file"
    class="hidden"
    name=""
    multiple
    ref="file"
    @change="$emit('file-choosen', $event.target.files)"
  />
</template>

<script setup>
import { ref } from 'vue';

const file = ref(null);
const handleClick = () => {
  return file.value.click();
};
defineEmits(['file-choosen']);
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
