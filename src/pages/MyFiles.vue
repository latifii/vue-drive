<template>
  <div class="container py-3">
    <ActionBar />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <button class="rounded-button">
        <icon-arrow-up />
      </button>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="item in 6">
        <div class="card mb-4">
          <div class="card-body text-center py-5">
            <icon-type-common height="4em" width="4em" />
          </div>
          <div class="card-footer">
            <div class="d-flex align-items-center">
              <icon-type-common />
              <span class="file-name">File {{ item }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card mb-4 selected-file">
          <div class="card-body text-center py-5">
            <icon-type-pdf height="4em" width="4em" />
          </div>
          <div class="card-footer">
            <div class="d-flex align-items-center">
              <icon-type-pdf />
              <span class="file-name">File 7.pdf</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card mb-4">
          <img class="file-thumb" src="https://picsum.photos/id/1015/400/160" />
          <div class="card-footer">
            <div class="d-flex align-items-center">
              <icon-type-image />
              <span class="file-name">File 8.png</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBar from "../components/ActionBar.vue";

export default {
  components: { ActionBar },
};
</script>
