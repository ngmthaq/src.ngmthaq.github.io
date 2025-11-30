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
    <h1 class="mb-4 text-2xl font-bold">Text Generator</h1>
    <div class="mb-4">
      <label for="charLength" class="block text-sm font-medium text-gray-700">
        Paragraph Character Length:
      </label>
      <input
        id="charLength"
        v-model.number="charLength"
        type="number"
        class="mt-1 block w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div class="relative mt-4 min-h-[150px] rounded border p-4">
      <textarea
        v-model="generatedText"
        readonly
        placeholder="Click the button to generate text."
        class="scrollbar-hide min-h-[200px] w-full resize-none border-none bg-transparent pe-16 outline-none"
        style="scrollbar-width: none; -ms-overflow-style: none"
      ></textarea>
      <button
        @click="copyToClipboard"
        class="absolute right-2 top-2 rounded border border-gray-300 px-2 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
      >
        Copy
      </button>
      <button
        @click="clearText"
        class="absolute right-2 top-10 rounded border border-gray-300 px-2 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
      >
        Clear
      </button>
    </div>
    <div class="mt-4 flex flex-wrap gap-2">
      <button
        @click="generateText"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Generate Text
      </button>
      <button
        @click="generateName"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Generate Name
      </button>
      <button
        @click="generateAddress"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Generate Address
      </button>
      <button
        @click="generateEmail"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Generate Email
      </button>
      <button
        @click="generatePhone"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Generate Phone
      </button>
      <button
        @click="generateDate"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Generate Date
      </button>
      <button
        @click="generateUUID"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Generate UUID
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const generatedText = ref("");
const charLength = ref(200);

const goBack = () => {
  router.go(-1);
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedText.value);
    alert("Text copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const clearText = () => {
  generatedText.value = "";
};

const generateText = () => {
  if (charLength.value <= 0) {
    generatedText.value = "";
  } else {
    const wordCount = Math.ceil(charLength.value / 5); // approximate average word length
    const text = faker.lorem.words(wordCount);
    generatedText.value = text.length > charLength.value ? text.slice(0, charLength.value) : text;
  }
};

const generateName = () => {
  generatedText.value = faker.person.fullName();
};

const generateAddress = () => {
  generatedText.value =
    faker.location.streetAddress() +
    ", " +
    faker.location.city() +
    ", " +
    faker.location.state() +
    " " +
    faker.location.zipCode();
};

const generateEmail = () => {
  generatedText.value = faker.internet.email();
};

const generatePhone = () => {
  generatedText.value = faker.phone.number();
};

const generateDate = () => {
  generatedText.value = faker.date.recent().toLocaleDateString();
};

const generateUUID = () => {
  generatedText.value = faker.string.uuid();
};
</script>

<style scoped>
textarea::-webkit-scrollbar {
  display: none;
}
</style>
