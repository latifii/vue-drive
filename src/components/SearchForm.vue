<template>
  <form class="form-inline mt-2 mt-md-0">
    <input
      class="form-control"
      type="text"
      placeholder="Search in Drive"
      aria-label="Search"
      :value="modelValue"
      @keydown.enter.prevent="handleEnterKey"
      @keydown.esc.prevent="handleEscKey"
    />
  </form>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);
const handleEnterKey = (e) => {
  emit('update:modelValue', e.target.value);
};
const handleEscKey = () => {
  emit('update:modelValue' , '')
}
</script>
