<template>
  <div class="container mx-auto p-4">
    <div class="mb-4">
      <button
        @click="goBack"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Back
      </button>
    </div>
    <h1 class="mb-4 text-2xl font-bold">Markdown Viewer</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Enter markdown text below to see it rendered as HTML.
    </p>
    <div class="flex h-[600px] gap-4">
      <!-- Left Panel: Input -->
      <div class="flex h-full w-1/2 flex-col">
        <label class="mb-2 block text-sm font-medium text-gray-700"> Markdown Input: </label>
        <VMarkdownEditor v-model="markdownInput" locale="en" class="flex-1" />
      </div>

      <!-- Right Panel: Output -->
      <div class="flex h-full w-1/2 flex-col">
        <label class="mb-2 block text-sm font-medium text-gray-700">Preview:</label>
        <div class="flex-1 overflow-auto rounded-md border border-gray-300 bg-white p-4 shadow-sm">
          <VMarkdownView :content="markdownInput" />
        </div>
      </div>
    </div>
    <div class="mt-4 flex gap-2">
      <button
        @click="clearAll"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import "vue3-markdown/dist/vue3-markdown.css";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { VMarkdownEditor, VMarkdownView } from "vue3-markdown";

const router = useRouter();
const markdownInput = ref(`# Hello World

This is **bold** and this is *italic*.

## Lists
- Item 1
- Item 2
- Item 3

## Code
\`\`\`javascript
console.log('Hello, World!');
\`\`\`

## Links
[GitHub](https://github.com)

## Tables
| Name | Age |
|------|-----|
| John | 30  |
| Jane | 25  |`);

const goBack = () => {
  router.go(-1);
};

const clearAll = () => {
  markdownInput.value = "";
};
</script>

<style scoped></style>
