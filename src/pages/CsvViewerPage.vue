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
    <h1 class="mb-4 text-2xl font-bold">CSV Viewer</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Enter CSV data below to view it as a table. Supports comma-separated values with headers.
    </p>

    <div class="mb-4">
      <label for="csvInput" class="mb-2 block text-sm font-medium text-gray-700">
        CSV Input:
      </label>
      <textarea
        id="csvInput"
        v-model="csvInput"
        placeholder="Enter your CSV data here..."
        class="h-48 w-full resize-none rounded-md border border-gray-300 p-4 font-mono text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      ></textarea>
    </div>

    <div class="mb-4 flex gap-2">
      <button
        @click="clearAll"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Clear
      </button>
    </div>

    <div v-if="parsedData.length > 0" class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in dataRows" :key="rowIndex" class="hover:bg-gray-50">
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="border border-gray-300 px-4 py-2 text-sm text-gray-900"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="csvInput.trim()" class="text-center text-gray-500">
      Invalid CSV data or no data to display.
    </div>
  </div>
</template>

<script setup lang="ts">
import Papa from "papaparse";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const csvInput = ref(`Name,Age,City
John,30,New York
Jane,25,Los Angeles
Bob,35,Chicago`);

const parsedData = computed(() => {
  if (!csvInput.value.trim()) return [];
  try {
    const result = Papa.parse(csvInput.value, {
      header: false,
      skipEmptyLines: true,
    });
    return result.data as string[][];
  } catch (error) {
    console.error("Error parsing CSV:", error);
    return [];
  }
});

const headers = computed(() => {
  if (parsedData.value.length === 0) return [];
  return parsedData.value[0];
});

const dataRows = computed(() => {
  if (parsedData.value.length <= 1) return [];
  return parsedData.value.slice(1);
});

const goBack = () => {
  router.go(-1);
};

const clearAll = () => {
  csvInput.value = "";
};
</script>

<style scoped></style>
