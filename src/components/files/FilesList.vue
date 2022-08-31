<template>
  <div class="row">
    <file-item v-for="file in files" :key="file.id" :file="file" />
  </div>
</template>

<script setup>
import FileItem from './FileItem.vue';
const props = defineProps({
  files: {
    type: Array,
    required: true,
  },
});
</script>

