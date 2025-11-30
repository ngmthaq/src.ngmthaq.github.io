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
    <h1 class="mb-4 text-2xl font-bold">Key Down Detector</h1>
    <p class="mb-4 text-gray-600">Press any key to see its properties.</p>
    <div class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="w-[50%] border border-gray-300 px-4 py-2 text-left">Property</th>
            <th class="w-[50%] border border-gray-300 px-4 py-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2 font-medium">Code</td>
            <td class="border border-gray-300 px-4 py-2">{{ keyInfo.code }}</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 px-4 py-2 font-medium">Key</td>
            <td class="border border-gray-300 px-4 py-2">{{ keyInfo.key }}</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2 font-medium">KeyCode</td>
            <td class="border border-gray-300 px-4 py-2">{{ keyInfo.keyCode }}</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 px-4 py-2 font-medium">Which</td>
            <td class="border border-gray-300 px-4 py-2">{{ keyInfo.which }}</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2 font-medium">Alt Key</td>
            <td class="border border-gray-300 px-4 py-2">{{ keyInfo.altKey ? "Yes" : "No" }}</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 px-4 py-2 font-medium">Ctrl Key</td>
            <td class="border border-gray-300 px-4 py-2">{{ keyInfo.ctrlKey ? "Yes" : "No" }}</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2 font-medium">Meta Key</td>
            <td class="border border-gray-300 px-4 py-2">{{ keyInfo.metaKey ? "Yes" : "No" }}</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 px-4 py-2 font-medium">Shift Key</td>
            <td class="border border-gray-300 px-4 py-2">{{ keyInfo.shiftKey ? "Yes" : "No" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const keyInfo = reactive({
  code: "",
  key: "",
  keyCode: 0,
  which: 0,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
});

const goBack = () => {
  router.go(-1);
};

const handleKeyDown = (event: KeyboardEvent) => {
  keyInfo.code = event.code;
  keyInfo.key = event.key;
  keyInfo.keyCode = event.keyCode;
  keyInfo.which = event.which;
  keyInfo.altKey = event.altKey;
  keyInfo.ctrlKey = event.ctrlKey;
  keyInfo.metaKey = event.metaKey;
  keyInfo.shiftKey = event.shiftKey;
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>
