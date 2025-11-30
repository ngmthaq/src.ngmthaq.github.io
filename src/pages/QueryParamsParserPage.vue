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
    <h1 class="mb-4 text-2xl font-bold">Query Parameters Parser</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Parse query parameters from URLs and view them in a structured format.
    </p>

    <div class="mb-4">
      <label for="queryUrlInput" class="mb-2 block text-sm font-medium text-gray-700">
        URL with Query Parameters:
      </label>
      <input
        id="queryUrlInput"
        v-model="queryUrlInput"
        type="url"
        placeholder="https://example.com/path?param1=value1&param2=value2"
        class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        @input="parseQueryParams"
      />
    </div>

    <div v-if="queryParams.length > 0" class="mb-4">
      <div class="mb-2 flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-700">Parsed Parameters:</label>
        <div class="flex gap-2">
          <button
            @click="copyQueryParams"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy JSON
          </button>
          <button
            @click="copyAsUrlEncoded"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy URL Encoded
          </button>
          <button
            @click="clearAll"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>
      <div class="rounded-md border border-gray-300 bg-gray-50 p-4">
        <div class="space-y-2">
          <div
            v-for="(param, index) in queryParams"
            :key="index"
            class="flex items-center gap-2 text-sm"
          >
            <span class="font-mono font-semibold text-blue-600">{{ param.key }}:</span>
            <span class="font-mono text-gray-900">{{ param.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="queryUrlInput.trim() && !hasQueryParams" class="mb-4">
      <p class="text-sm text-gray-500">No query parameters found in the URL.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const queryUrlInput = ref(
  "https://example.com/path?param1=value1&param2=value2&param3=hello%20world",
);
const queryParams = ref<{ key: string; value: string }[]>([]);
const hasQueryParams = ref(false);

const parseQueryParams = () => {
  queryParams.value = [];
  hasQueryParams.value = false;

  if (!queryUrlInput.value.trim()) return;

  try {
    const url = new URL(queryUrlInput.value);
    const params = new URLSearchParams(url.search);

    for (const [key, value] of params.entries()) {
      queryParams.value.push({ key, value });
    }

    hasQueryParams.value = queryParams.value.length > 0;
  } catch {
    // Invalid URL, try to parse query string manually
    try {
      const queryIndex = queryUrlInput.value.indexOf("?");
      if (queryIndex !== -1) {
        const queryString = queryUrlInput.value.substring(queryIndex + 1);
        const params = new URLSearchParams(queryString);

        for (const [key, value] of params.entries()) {
          queryParams.value.push({ key, value });
        }

        hasQueryParams.value = queryParams.value.length > 0;
      }
    } catch {
      // Ignore errors for manual parsing
    }
  }
};

const copyQueryParams = async () => {
  if (queryParams.value.length === 0) return;

  const jsonOutput = JSON.stringify(
    Object.fromEntries(queryParams.value.map((p) => [p.key, p.value])),
    null,
    2,
  );

  try {
    await navigator.clipboard.writeText(jsonOutput);
    alert("Query parameters copied as JSON to clipboard!");
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = jsonOutput;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Query parameters copied as JSON to clipboard!");
  }
};

const copyAsUrlEncoded = async () => {
  if (queryParams.value.length === 0) return;

  const params = new URLSearchParams();
  queryParams.value.forEach((param) => {
    params.append(param.key, param.value);
  });

  const encodedString = params.toString();

  try {
    await navigator.clipboard.writeText(encodedString);
    alert("Query parameters copied as URL encoded string to clipboard!");
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = encodedString;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Query parameters copied as URL encoded string to clipboard!");
  }
};

const goBack = () => {
  router.go(-1);
};

const clearAll = () => {
  queryUrlInput.value = "";
  queryParams.value = [];
  hasQueryParams.value = false;
};

// Initialize query parsing
parseQueryParams();
</script>

<style scoped></style>
