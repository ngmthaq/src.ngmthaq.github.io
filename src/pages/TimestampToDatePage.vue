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
    <h1 class="mb-4 text-2xl font-bold">Timestamp to Date Converter</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Enter a Unix timestamp (in seconds or milliseconds). The converter will display both UTC
      and local time.
    </p>
    <div class="mb-4">
      <label for="timestamp" class="mb-2 block text-sm font-medium text-gray-700">
        Timestamp
      </label>
      <input
        id="timestamp"
        v-model.number="timestamp"
        type="number"
        placeholder="Enter timestamp (e.g., 1700000000)"
        class="w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div class="mb-4">
      <h2 class="mb-2 text-lg font-semibold">Results</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="rounded border border-gray-300 p-4">
          <h3 class="mb-2 font-medium text-gray-900">UTC Time</h3>
          <p class="text-sm text-gray-600">{{ utcDateTime || "Invalid timestamp" }}</p>
        </div>
        <div class="rounded border border-gray-300 p-4">
          <h3 class="mb-2 font-medium text-gray-900">Local Time</h3>
          <p class="text-sm text-gray-600">{{ localDateTime || "Invalid timestamp" }}</p>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <button
        @click="clearTimestamp"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Reset to Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const timestamp = ref<number>(Math.floor(Date.now() / 1000));

const goBack = () => {
  router.go(-1);
};

const clearTimestamp = () => {
  timestamp.value = Math.floor(Date.now() / 1000);
};

const utcDateTime = computed(() => {
  if (isNaN(timestamp.value)) return null;

  let ts = timestamp.value;
  // If timestamp is in seconds (typical Unix timestamp), convert to milliseconds
  if (ts < 1e12) {
    ts *= 1000;
  }

  const date = new Date(ts);
  return date
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, " UTC");
});

const localDateTime = computed(() => {
  if (isNaN(timestamp.value)) return null;

  let ts = timestamp.value;
  // If timestamp is in seconds (typical Unix timestamp), convert to milliseconds
  if (ts < 1e12) {
    ts *= 1000;
  }

  const date = new Date(ts);
  return date.toLocaleString();
});
</script>

<style scoped></style>
