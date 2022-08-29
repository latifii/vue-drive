<template>
  <Navbar />
  <MyFiles />
</template>

<script>
import MyFiles from "./pages/MyFiles.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
    MyFiles,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap");

body {
  padding-top: 50px;
}

#app {
  font-family: "PT Sans", Arial, sans-serif;
  color: #333;
}

.card-footer {
  background-color: transparent;
  border-top: none;
}
.selected-file .card-footer,
.selected-folder {
  background-color: #e8f0fe;
  color: #387bd9;
}
.selected-folder {
  border-radius: calc(0.25rem - 1px);
}
.active {
  border: 1px solid #1967d2;
}
.selected-file svg,
.selected-folder svg {
  fill: #333;
}

.file-thumb {
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  height: 160px;
}

.file-name {
  margin-left: 1rem;
  font-size: 0.9em;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}

.rounded-button {
  background: transparent;
  width: 2em;
  height: 2em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  text-decoration: none;
  font-weight: bold;
  color: #333;
  opacity: 0.8;
  transition: all 0.3s ease-out;
}
.rounded-button:hover {
  background: #ddd;
  color: #333;
  opacity: 1;
}
</style>
