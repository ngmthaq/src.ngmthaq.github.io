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
    <h1 class="mb-4 text-2xl font-bold">String Converter</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Enter text below to convert it to different formats.
    </p>

    <div class="mb-4">
      <label for="inputText" class="mb-2 block text-sm font-medium text-gray-700">
        Input Text
      </label>
      <textarea
        id="inputText"
        v-model="inputText"
        placeholder="Enter your text here..."
        class="h-32 w-full resize-none rounded-md border border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        rows="4"
      ></textarea>
    </div>

    <div class="mb-4 flex gap-2">
      <button
        @click="clearAll"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Clear All
      </button>
    </div>

    <div class="space-y-4">
      <div class="rounded border border-gray-300 p-4">
        <div class="mb-2 flex items-center justify-between">
          <h3 class="font-medium text-gray-900">Uppercase</h3>
          <button
            @click="copyToClipboard(uppercaseText)"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy
          </button>
        </div>
        <div class="rounded bg-gray-100 p-3 font-mono text-sm">
          {{ uppercaseText || "No text entered" }}
        </div>
      </div>

      <div class="rounded border border-gray-300 p-4">
        <div class="mb-2 flex items-center justify-between">
          <h3 class="font-medium text-gray-900">Lowercase</h3>
          <button
            @click="copyToClipboard(lowercaseText)"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy
          </button>
        </div>
        <div class="rounded bg-gray-100 p-3 font-mono text-sm">
          {{ lowercaseText || "No text entered" }}
        </div>
      </div>

      <div class="rounded border border-gray-300 p-4">
        <div class="mb-2 flex items-center justify-between">
          <h3 class="font-medium text-gray-900">Capitalize First Word</h3>
          <button
            @click="copyToClipboard(capitalizeFirstText)"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy
          </button>
        </div>
        <div class="rounded bg-gray-100 p-3 font-mono text-sm">
          {{ capitalizeFirstText || "No text entered" }}
        </div>
      </div>

      <div class="rounded border border-gray-300 p-4">
        <div class="mb-2 flex items-center justify-between">
          <h3 class="font-medium text-gray-900">Capitalize Each Word</h3>
          <button
            @click="copyToClipboard(capitalizeEachText)"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy
          </button>
        </div>
        <div class="rounded bg-gray-100 p-3 font-mono text-sm">
          {{ capitalizeEachText || "No text entered" }}
        </div>
      </div>

      <div class="rounded border border-gray-300 p-4">
        <div class="mb-2 flex items-center justify-between">
          <h3 class="font-medium text-gray-900">Slug</h3>
          <button
            @click="copyToClipboard(slugText)"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy
          </button>
        </div>
        <div class="rounded bg-gray-100 p-3 font-mono text-sm">
          {{ slugText || "No text entered" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const inputText = ref("");

const goBack = () => {
  router.go(-1);
};

const clearAll = () => {
  inputText.value = "";
};

const uppercaseText = computed(() => {
  return inputText.value ? inputText.value.toUpperCase() : "";
});

const lowercaseText = computed(() => {
  return inputText.value ? inputText.value.toLowerCase() : "";
});

const capitalizeFirstText = computed(() => {
  if (!inputText.value) return "";
  return inputText.value.charAt(0).toUpperCase() + inputText.value.slice(1).toLowerCase();
});

const capitalizeEachText = computed(() => {
  if (!inputText.value) return "";
  return inputText.value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
});

const slugText = computed(() => {
  if (!inputText.value) return "";
  return inputText.value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
});

const copyToClipboard = async (text: string) => {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Text copied to clipboard!");
  }
};
</script>

<style scoped></style>
