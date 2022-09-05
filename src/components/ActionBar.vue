<template>
  <div
    class="d-flex justify-content-between align-items-center border-bottom pt-2 pb-3"
    v-show="selectedCount"
  >
    <button class="btn btn-outline-primary">
      <icon-upload /> Upload Files
    </button>

    <div class="action-buttons">
      <button
        type="button"
        class="rounded-button"
        title="Rename"
        v-show="selectedCount === 1"
        @click="$emit('rename')"
      >
        <icon-pencil />
      </button>
      <button
        type="button"
        class="rounded-button"
        title="Remove selected"
        v-show="selectedCount"
        @click="$emit('remove')"
      >
        <icon-trash />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ['remove', 'rename'],
};
</script>
