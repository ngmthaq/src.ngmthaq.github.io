<template>
  <div class="c-card container mx-auto">
    <div class="mb-4">
      <button
        @click="goBack"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Back
      </button>
    </div>
    <h1 class="mb-4 text-2xl font-bold">JSON Viewer</h1>

    <div v-if="error" class="mb-4 rounded border border-red-300 bg-red-50 p-4">
      <p class="text-red-800">{{ error }}</p>
    </div>

    <div class="flex h-96 gap-4">
      <!-- Left Panel: Input -->
      <div class="flex h-full w-1/2 flex-col">
        <label for="jsonInput" class="mb-2 block text-sm font-medium text-gray-700"
          >JSON Input:</label
        >
        <textarea
          id="jsonInput"
          v-model="jsonInput"
          placeholder='{"name": "John", "age": 30, "city": "New York"}'
          class="flex-1 resize-none rounded-md border border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>

      <!-- Right Panel: Output -->
      <div class="flex h-full w-1/2 flex-col">
        <label class="mb-2 block text-sm font-medium text-gray-700">Formatted JSON:</label>
        <div class="flex-1 overflow-auto rounded-md border border-gray-300 bg-white p-4 shadow-sm">
          <pre v-if="parsedData" class="whitespace-pre-wrap font-mono text-sm">{{
            formattedJson
          }}</pre>
          <p v-else class="text-sm text-gray-500">Parsed JSON will appear here...</p>
        </div>
      </div>
    </div>

    <div class="mt-4 flex gap-2">
      <button
        @click="parseJson"
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Parse JSON
      </button>
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
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const jsonInput = ref("");
const error = ref("");
const parsedData = ref<unknown>(null);

const formattedJson = computed(() => {
  if (!parsedData.value) return "";
  return JSON.stringify(parsedData.value, null, 2);
});

const goBack = () => {
  router.go(-1);
};

const parseJson = () => {
  error.value = "";
  parsedData.value = null;

  if (!jsonInput.value.trim()) {
    error.value = "Please enter JSON to parse.";
    return;
  }

  try {
    const parsed = JSON.parse(jsonInput.value);
    parsedData.value = parsed;
  } catch (err) {
    error.value = `Invalid JSON: ${(err as Error).message}`;
  }
};

const clearAll = () => {
  jsonInput.value = "";
  parsedData.value = null;
  error.value = "";
};
</script>
