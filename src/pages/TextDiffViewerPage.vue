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
    <h1 class="mb-4 text-2xl font-bold">Text Diff Viewer</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Enter the original and modified text below to see the differences highlighted.
    </p>

    <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label for="originalText" class="mb-2 block text-sm font-medium text-gray-700">
          Original Text:
        </label>
        <textarea
          id="originalText"
          v-model="originalText"
          placeholder="Enter the original text here..."
          class="h-48 w-full resize-none rounded-md border border-gray-300 p-4 font-mono text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>
      <div>
        <label for="modifiedText" class="mb-2 block text-sm font-medium text-gray-700">
          Modified Text:
        </label>
        <textarea
          id="modifiedText"
          v-model="modifiedText"
          placeholder="Enter the modified text here..."
          class="h-48 w-full resize-none rounded-md border border-gray-300 p-4 font-mono text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>
    </div>

    <div class="mb-4 flex gap-2">
      <button
        @click="computeDiff"
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Compare Texts
      </button>
      <button
        @click="clearAll"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Clear
      </button>
    </div>

    <div v-if="diffResult.length > 0" class="mb-4">
      <div class="mb-2 flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-700">Differences:</label>
        <button
          @click="copyDiff"
          class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
        >
          Copy Diff
        </button>
      </div>
      <div
        class="whitespace-pre-wrap rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm"
      >
        <span
          v-for="(part, index) in diffResult"
          :key="index"
          :class="{
            'bg-green-200 text-green-800': part.added,
            'bg-red-200 text-red-800': part.removed,
            'text-gray-900': !part.added && !part.removed,
          }"
        >
          {{ part.value }}
        </span>
      </div>
    </div>

    <div v-else-if="hasComputed" class="text-center text-gray-500">
      No differences found or texts are identical.
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Change, diffChars } from "diff";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const originalText = ref(`The quick brown fox jumps over the lazy dog.`);
const modifiedText = ref(`The fast brown fox leaps over the lazy dog.`);
const diffResult = ref<Change[]>([]);
const hasComputed = ref(false);

const computedDiff = computed(() => {
  if (!originalText.value || !modifiedText.value) return [];
  return diffChars(originalText.value, modifiedText.value);
});

const computeDiff = () => {
  diffResult.value = computedDiff.value;
  hasComputed.value = true;
};

const copyDiff = async () => {
  if (diffResult.value.length === 0) return;

  const diffText = diffResult.value
    .map((part) => {
      if (part.added) return `+${part.value}`;
      if (part.removed) return `-${part.value}`;
      return ` ${part.value}`;
    })
    .join("");

  try {
    await navigator.clipboard.writeText(diffText);
    alert("Diff copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    const textArea = document.createElement("textarea");
    textArea.value = diffText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Diff copied to clipboard!");
  }
};

const goBack = () => {
  router.go(-1);
};

const clearAll = () => {
  originalText.value = "";
  modifiedText.value = "";
  diffResult.value = [];
  hasComputed.value = false;
};
</script>

<style scoped></style>
