<template>
  <form @submit.prevent="handleSubmit">
    <input v-highlight type="text" class="form-control" v-model="name" />
    <div class="d-flex flex-row-reverse mt-3">
      <button class="btn btn-primary" type="submit">OK</button>
      <button
        class="btn btn-outline-secondary me-2"
        @click.prevent="$emit('hide')"
      >
        Cansel
      </button>
    </div>
  </form>
</template>

<script>
import filesApi from '../../api/files';
import { nextTick } from 'vue';
export default {
  data() {
    return {
      name: this.file.name,
    };
  },
  emits: ['hide', 'file-updated'],
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  directives: {
    highlight: {
      mounted(el) {
        nextTick(() => {
          const selectionEnd = el.value
            .split('.')
            .slice(0, -1)
            .join('.').length;
          el.setSelectionRange(0, selectionEnd);
        });
        el.focus();
      },
    },
  },
  methods: {
    async handleSubmit() {
      try {
        const { data } = await filesApi.update(
          { ...this.file, name: this.name },
          this.file.id
        );
        this.$emit('file-updated', data);
        this.$emit('hide');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
