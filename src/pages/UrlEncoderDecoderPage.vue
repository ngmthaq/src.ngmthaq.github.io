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
    <h1 class="mb-4 text-2xl font-bold">URL Encoder / Decoder</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Encode or decode URLs using standard URL encoding.
    </p>

    <!-- URL Encode/Decode Section -->
    <div class="mb-6">
      <h2 class="mb-2 text-lg font-semibold">URL Encode/Decode</h2>
      <div class="mb-4">
        <label for="urlInput" class="mb-2 block text-sm font-medium text-gray-700">
          Input Text:
        </label>
        <textarea
          id="urlInput"
          v-model="urlInput"
          placeholder="Enter text to encode or encoded URL to decode..."
          class="h-24 w-full resize-none rounded-md border border-gray-300 p-4 font-mono text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>
      <div class="mb-4 flex gap-2">
        <button
          @click="encodeUrl"
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Encode URL
        </button>
        <button
          @click="decodeUrl"
          class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Decode URL
        </button>
        <button
          @click="clearAll"
          class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
      <div v-if="urlOutput">
        <div class="mb-2 flex items-center justify-between">
          <label class="block text-sm font-medium text-gray-700">Result:</label>
          <button
            @click="copyUrlOutput"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy
          </button>
        </div>
        <textarea
          v-model="urlOutput"
          readonly
          class="h-24 w-full resize-none rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm shadow-sm"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const urlInput = ref("Hello World! This is a test string with spaces & special chars.");
const urlOutput = ref("");

const encodeUrl = () => {
  try {
    urlOutput.value = encodeURIComponent(urlInput.value);
  } catch {
    urlOutput.value = "Error encoding URL";
  }
};

const decodeUrl = () => {
  try {
    urlOutput.value = decodeURIComponent(urlInput.value);
  } catch {
    urlOutput.value = "Error decoding URL. Please check if it's properly encoded.";
  }
};

const copyUrlOutput = async () => {
  if (!urlOutput.value) return;
  try {
    await navigator.clipboard.writeText(urlOutput.value);
    alert("URL result copied to clipboard!");
  } catch {
    console.error("Failed to copy");
    const textArea = document.createElement("textarea");
    textArea.value = urlOutput.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("URL result copied to clipboard!");
  }
};

const goBack = () => {
  router.go(-1);
};

const clearAll = () => {
  urlInput.value = "";
  urlOutput.value = "";
};
</script>

<style scoped></style>
