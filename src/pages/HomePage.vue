<template>
  <div class="c-card container mx-auto py-8">
    <h1 class="mb-4 text-center text-4xl font-bold">Nguyen Manh Thang</h1>
    <p class="mb-16 text-center text-lg">Welcome back! This is the home page of my application</p>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="h-40 w-[calc(25%-theme(gap.4)*3/4)] rounded bg-blue-50 text-center shadow-sm hover:shadow-lg"
      >
        <RouterLink
          :to="{ name: item.pathName }"
          class="flex h-full w-full items-center justify-center p-4 hover:text-blue-800"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { pathNames } from "@/routes";

const items = ref<{ name: string; pathName: string }[]>([
  { name: "My Resume", pathName: pathNames.resume },
  { name: "Text Generator", pathName: pathNames.textGenerator },
  { name: "Meta Generator", pathName: pathNames.metaGenerator },
  { name: "NPM Script Generator", pathName: pathNames.npmScript },
  { name: "Word Counter", pathName: pathNames.wordCounter },
  { name: "On Key Down", pathName: pathNames.onKeyDown },
  { name: "JavaScript Regex Test", pathName: pathNames.javascriptRegexTest },
  { name: "Timestamp to Date", pathName: pathNames.timestampToDate },
  { name: "String Converter", pathName: pathNames.stringConverter },
  { name: "JSON Viewer", pathName: pathNames.jsonViewer },
  { name: "Markdown Viewer", pathName: pathNames.markdownViewer },
  { name: "CSV Viewer", pathName: pathNames.csvViewer },
]);
</script>

<style scoped></style>
