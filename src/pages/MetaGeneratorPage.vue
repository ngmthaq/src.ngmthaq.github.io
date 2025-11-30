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
    <h1 class="mb-4 text-2xl font-bold">Meta Generator</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Enter the details below to generate SEO meta tags including Open Graph and Twitter Card
      tags.
    </p>

    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label for="title" class="mb-2 block text-sm font-medium text-gray-700">Title:</label>
        <input
          id="title"
          v-model="inputs.title"
          type="text"
          placeholder="Page Title"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="description" class="mb-2 block text-sm font-medium text-gray-700"
          >Description:</label
        >
        <input
          id="description"
          v-model="inputs.description"
          type="text"
          placeholder="Page description"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="url" class="mb-2 block text-sm font-medium text-gray-700">URL:</label>
        <input
          id="url"
          v-model="inputs.url"
          type="url"
          placeholder="https://example.com/page"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="imageUrl" class="mb-2 block text-sm font-medium text-gray-700"
          >Image URL:</label
        >
        <input
          id="imageUrl"
          v-model="inputs.imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="author" class="mb-2 block text-sm font-medium text-gray-700">Author:</label>
        <input
          id="author"
          v-model="inputs.author"
          type="text"
          placeholder="Author Name"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="keywords" class="mb-2 block text-sm font-medium text-gray-700">Keywords:</label>
        <input
          id="keywords"
          v-model="inputs.keywords"
          type="text"
          placeholder="keyword1, keyword2, keyword3"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>

    <div class="mb-4">
      <div class="mb-2 flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-700">Generated Meta Tags:</label>
        <button
          @click="copyMeta"
          class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
        >
          Copy Meta Tags
        </button>
      </div>
      <textarea
        v-model="generatedMeta"
        readonly
        class="h-64 w-full resize-none rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm shadow-sm"
      ></textarea>
    </div>

    <div class="flex gap-2">
      <button
        @click="clearAll"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const inputs = reactive({
  title: "My Awesome Page",
  description: "This is a description of my awesome page.",
  url: "https://example.com/my-awesome-page",
  imageUrl: "https://example.com/images/og-image.jpg",
  author: "John Doe",
  keywords: "keyword1, keyword2, keyword3",
});

const generatedMeta = computed(() => {
  const { title, description, url, imageUrl, author, keywords } = inputs;

  const metaTags = [
    `<!-- Standard Meta Tags -->`,
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<meta name="keywords" content="${keywords}">`,
    `<meta name="author" content="${author}">`,
    ``,
    `<!-- Open Graph / Facebook -->`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:image" content="${imageUrl}">`,
    ``,
    `<!-- Twitter -->`,
    `<meta property="twitter:card" content="summary_large_image">`,
    `<meta property="twitter:url" content="${url}">`,
    `<meta property="twitter:title" content="${title}">`,
    `<meta property="twitter:description" content="${description}">`,
    `<meta property="twitter:image" content="${imageUrl}">`,
  ];

  return metaTags.join("\n");
});

const goBack = () => {
  router.go(-1);
};

const copyMeta = async () => {
  if (!generatedMeta.value.trim()) return;

  try {
    await navigator.clipboard.writeText(generatedMeta.value);
    alert("Meta tags copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    // Fallback
    const textArea = document.createElement("textarea");
    textArea.value = generatedMeta.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Meta tags copied to clipboard!");
  }
};

const clearAll = () => {
  inputs.title = "";
  inputs.description = "";
  inputs.url = "";
  inputs.imageUrl = "";
  inputs.author = "";
  inputs.keywords = "";
};
</script>

<style scoped></style>
