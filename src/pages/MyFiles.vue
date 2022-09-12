<template>
  <div class="container py-3">
    <action-bar
      :selected-count="selectedItems.length"
      @remove="handleRemove"
      @rename="showModal = true"
      @file-choosen="choosenFiles = $event"
    />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <sort-toggler @sort-change="handleSortChange" />
    </div>
    <teleport to="#search-form">
      <search-form v-model="q" />
    </teleport>

    <files-list :files="files" @select-change="handleSelectChange" />

    <app-modal
      title="Rename Test"
      :show="showModal && selectedItems.length === 1"
      @hide="showModal = false"
    >
      <file-rename-form
        @hide="showModal = false"
        :file="selectedItems[0]"
        @file-updated="handleFileUpdated"
      />
    </app-modal>
    <div v-if="choosenFiles.length">uploading...</div>
  </div>
</template>

<script setup>
import ActionBar from '../components/ActionBar.vue';
import SortToggler from '../components/SortToggler.vue';
import SearchForm from '../components/SearchForm.vue';
import FilesList from '../components/files/FilesList.vue';
import filesApi from '../api/files';
import {  reactive, ref, toRef, watchEffect } from 'vue';
import { useToast } from 'vue-toast-notification';
import FileRenameForm from '../components/files/FileRenameForm.vue';

const files = ref([]);
const choosenFiles = ref([]);
const showModal = ref(false);
const selectedItems = ref([]);
const query = reactive({
  _sort: 'name',
  _order: 'asc',
  q: '',
});
const $toast = useToast();
const q = toRef(query, 'q');

const handleSortChange = (payload) => {
  query._sort = payload.column;
  query._order = payload.order;
};
const handleRemove = () => {
  if (confirm('Are you sure?')) {
    selectedItems.value.forEach((item) => removeItem(item, files));
    selectedItems.value.splice(0);
  }
};
const handleSelectChange = (item) => {
  return (selectedItems.value = Array.from(item));
};
const handleFileUpdated = (file) => {
  const oldFile = selectedItems.value[0];
  const index = files.value.findIndex((item) => item.id === file.id);
  files.value.splice(index, 1, file);
  console.log(oldFile);
  $toast.success(`File ${oldFile.name} renamed to ${file.name}`);
};

const fetchFiles = async (query) => {
  try {
    const { data } = await filesApi.index(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};
 
const removeItem = async (item) => {
  try {
    const res = await filesApi.delete(item.id);
    if (res.status === 200 || res.status === 204) {
      const index = files.value.findIndex((file) => file.id === item.id);
      files.value.splice(index, 1);
      $toast.success('Selected items successfully removed');
    }
  } catch (error) {
    console.log(error);
  }
};
watchEffect(async () => (files.value = await fetchFiles(query)));
</script>
