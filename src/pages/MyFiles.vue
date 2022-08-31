<template>
  <div class="container py-3">
    <action-bar />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <button class="rounded-button">
        <icon-arrow-up />
      </button>
    </div>
    <files-list :files="files" />
  </div>
</template>

<script setup>
import ActionBar from '../components/ActionBar.vue';
import FilesList from '../components/files/FilesList.vue';
import filesApi from '../api/files';
import { onMounted, ref } from 'vue';

const files = ref([]);
const fetchFiles = () => {
  filesApi
    .index()
    .then((res) => (files.value = res.data))
    .catch((err) => console.log(err.message));
};
onMounted(() => fetchFiles());
</script>
