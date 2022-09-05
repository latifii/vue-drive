<template>
  <div class="row" @click="nonSelected">
    <file-item
      v-for="file in files"
      :key="file.id"
      :file="file"
      @click.exact.stop="selectedOne(file)"
      @click.ctrl.exact.stop="selectedMultiple(file)"
      :class="{ 'selected-file': isSelected(file) }"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import FileItem from './FileItem.vue';
const props = defineProps({
  files: {
    type: Array,
    required: true,
  },
});
const selectedItems = reactive(new Set());
const emit = defineEmits(['select-change']);

const selectedOne = (item) => {
  selectedItems.clear();
  selectedItems.add(item);
  emit('select-change', selectedItems);
};
const nonSelected = () => {
  selectedItems.clear();
  emit('select-change', selectedItems);
};
const selectedMultiple = (item) => {
  if (selectedItems.has(item)) {
    selectedItems.delete(item);
  } else {
    selectedItems.add(item);
  }
  emit('select-change', selectedItems);
};
const isSelected = (item) => selectedItems.has(item);
</script>
