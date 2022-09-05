<template>
  <div class="container py-3">
    <action-bar />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <sort-toggler @sort-change="handleSortChange" />
    </div>
    <teleport to="#search-form">
      <search-form v-model="q" />
    </teleport>
    <files-list :files="files" />
  </div>
</template>

<script setup>
import ActionBar from '../components/ActionBar.vue';
import SortToggler from '../components/SortToggler.vue';
import SearchForm from '../components/SearchForm.vue';
import FilesList from '../components/files/FilesList.vue';
import filesApi from '../api/files';
import { reactive, ref, toRef, watchEffect } from 'vue';

const files = ref([]);
const query = reactive({
  _sort: 'name',
  _order: 'asc',
  q: ''
});

const q = toRef(query,'q')

const handleSortChange = (payload) => {
  query._sort = payload.column;
  query._order = payload.order;
};

const fetchFiles = async (query) => {
  try {
    const { data } = await filesApi.index(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};

watchEffect(async () => (files.value = await fetchFiles(query)));

</script>
