<template>
  <div class="container py-3">
    <action-bar />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <sort-toggler @sort-change="handleSortChange" />
    </div>
    <files-list :files="files" />
  </div>
</template>

<script>
import ActionBar from '../components/ActionBar.vue';
import SortToggler from '../components/SortToggler.vue';
import FilesList from '../components/files/FilesList.vue';
import filesApi from '../api/files';
import { reactive, ref, watchEffect } from 'vue';

const fetchFiles = async (query) => {
  try {
    const { data } = await filesApi.index(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  components: { ActionBar, SortToggler, FilesList },
  setup() {
    const files = ref([]);
    const query = reactive({
      _sort: 'name',
      _order: 'asc',
    });
    const handleSortChange = (payload) => {
      query._sort = payload.column;
      query._order = payload.order;
    };

    //   await filesApi
    //     .index(query)
    //     .then((res) => (files.value = res.data))
    //     .catch((err) => console.log(err.message));
    // };
    watchEffect(async () => (files.value = await fetchFiles(query)));

    return { files, handleSortChange };
  },
};
</script>
