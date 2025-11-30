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
    <h1 class="mb-4 text-2xl font-bold">Word Counter</h1>
    <p class="mb-4 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-600">
      ⚠️ Note: Word counting may not work correctly with non-Latin scripts or complex text layouts.
    </p>
    <div class="mb-4">
      <textarea
        v-model="inputText"
        placeholder="Type your text here..."
        class="w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        rows="10"
      ></textarea>
    </div>
    <div class="mb-4 flex justify-between gap-8">
      <div>
        <p class="text-base">Words: {{ wordCount }}</p>
        <p class="text-base">Characters: {{ charCount }}</p>
      </div>
      <button
        @click="clearText"
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
const inputText = ref("");

const goBack = () => {
  router.go(-1);
};

const wordCount = computed(() => {
  if (!inputText.value.trim()) return 0;
  return inputText.value.trim().split(/\s+/).length;
});

const charCount = computed(() => {
  return inputText.value.length;
});

const clearText = () => {
  inputText.value = "";
};
</script>
