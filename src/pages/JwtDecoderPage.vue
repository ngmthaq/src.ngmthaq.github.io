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
    <h1 class="mb-4 text-2xl font-bold">JWT Decoder</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Paste your JWT token below to decode and view its header, payload, and signature.
    </p>

    <div class="mb-4">
      <label for="jwtInput" class="mb-2 block text-sm font-medium text-gray-700">
        JWT Token:
      </label>
      <textarea
        id="jwtInput"
        v-model="jwtInput"
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        class="h-24 w-full resize-none rounded-md border border-gray-300 p-4 font-mono text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      ></textarea>
    </div>

    <div class="mb-4 flex gap-2">
      <button
        @click="decodeJwt"
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Decode JWT
      </button>
      <button
        @click="clearAll"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Clear
      </button>
    </div>

    <div v-if="decodedHeader" class="mb-4">
      <div class="mb-2 flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-700">Header:</label>
        <button
          @click="copyHeader"
          class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
        >
          Copy
        </button>
      </div>
      <pre class="rounded-md border border-gray-300 bg-gray-50 p-4 text-sm">{{
        decodedHeader
      }}</pre>
    </div>

    <div v-if="decodedPayload" class="mb-4">
      <div class="mb-2 flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-700">Payload:</label>
        <button
          @click="copyPayload"
          class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
        >
          Copy
        </button>
      </div>
      <pre class="rounded-md border border-gray-300 bg-gray-50 p-4 text-sm">{{
        decodedPayload
      }}</pre>
    </div>

    <div v-if="signature" class="mb-4">
      <div class="mb-2 flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-700">Signature:</label>
        <button
          @click="copySignature"
          class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
        >
          Copy
        </button>
      </div>
      <pre class="rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm">{{
        signature
      }}</pre>
    </div>

    <div v-if="error" class="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
      ❌ {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const jwtInput = ref(
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
);
const decodedHeader = ref("");
const decodedPayload = ref("");
const signature = ref("");
const error = ref("");

const decodeBase64Url = (str: string): string => {
  try {
    // Convert base64url to base64
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    // Add padding if needed
    while (base64.length % 4) {
      base64 += "=";
    }
    return atob(base64);
  } catch {
    throw new Error("Invalid base64url string");
  }
};

const decodeJwt = () => {
  error.value = "";
  decodedHeader.value = "";
  decodedPayload.value = "";
  signature.value = "";

  if (!jwtInput.value.trim()) {
    error.value = "Please enter a JWT token";
    return;
  }

  const parts = jwtInput.value.split(".");
  if (parts.length !== 3) {
    error.value = "Invalid JWT format. JWT should have 3 parts separated by dots.";
    return;
  }

  try {
    const header = JSON.parse(decodeBase64Url(parts[0]!));
    decodedHeader.value = JSON.stringify(header, null, 2);

    const payload = JSON.parse(decodeBase64Url(parts[1]!));
    decodedPayload.value = JSON.stringify(payload, null, 2);

    signature.value = parts[2]!;
  } catch {
    error.value = "Failed to decode JWT. Please check if it's a valid JWT token.";
  }
};

const copyHeader = async () => {
  if (!decodedHeader.value) return;
  try {
    await navigator.clipboard.writeText(decodedHeader.value);
    alert("Header copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    const textArea = document.createElement("textarea");
    textArea.value = decodedHeader.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Header copied to clipboard!");
  }
};

const copyPayload = async () => {
  if (!decodedPayload.value) return;
  try {
    await navigator.clipboard.writeText(decodedPayload.value);
    alert("Payload copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    const textArea = document.createElement("textarea");
    textArea.value = decodedPayload.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Payload copied to clipboard!");
  }
};

const copySignature = async () => {
  if (!signature.value) return;
  try {
    await navigator.clipboard.writeText(signature.value);
    alert("Signature copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    const textArea = document.createElement("textarea");
    textArea.value = signature.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Signature copied to clipboard!");
  }
};

const goBack = () => {
  router.go(-1);
};

const clearAll = () => {
  jwtInput.value = "";
  decodedHeader.value = "";
  decodedPayload.value = "";
  signature.value = "";
  error.value = "";
};
</script>

<style scoped></style>
