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
    <h1 class="mb-4 text-2xl font-bold">JavaScript Regex Tester</h1>
    <div class="mb-4">
      <label for="regex" class="block text-sm font-medium text-gray-700">Regex Pattern:</label>
      <input
        id="regex"
        v-model="regexPattern"
        type="text"
        placeholder="/pattern/flags"
        class="mt-1 block w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Flags:</label>
      <div class="mt-2 space-y-2">
        <label class="inline-flex items-center">
          <input
            v-model="selectedFlags"
            type="checkbox"
            value="g"
            class="rounded border border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span class="ml-2 text-sm">g - Global</span>
        </label>
        <label class="inline-flex items-center">
          <input
            v-model="selectedFlags"
            type="checkbox"
            value="i"
            class="ml-4 rounded border border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span class="ml-2 text-sm">i - Case Insensitive</span>
        </label>
        <label class="inline-flex items-center">
          <input
            v-model="selectedFlags"
            type="checkbox"
            value="m"
            class="ml-4 rounded border border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span class="ml-2 text-sm">m - Multiline</span>
        </label>
        <label class="inline-flex items-center">
          <input
            v-model="selectedFlags"
            type="checkbox"
            value="s"
            class="ml-4 rounded border border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span class="ml-2 text-sm">s - Dot All</span>
        </label>
        <label class="inline-flex items-center">
          <input
            v-model="selectedFlags"
            type="checkbox"
            value="u"
            class="ml-4 rounded border border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span class="ml-2 text-sm">u - Unicode</span>
        </label>
        <label class="inline-flex items-center">
          <input
            v-model="selectedFlags"
            type="checkbox"
            value="y"
            class="ml-4 rounded border border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span class="ml-2 text-sm">y - Sticky</span>
        </label>
      </div>
    </div>
    <div v-if="regexPattern" class="mb-4 rounded border bg-gray-50 p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-700">Full Regex Pattern:</p>
          <p class="mt-1 font-mono text-lg">/{{ regexPattern }}/{{ selectedFlags.join("") }}</p>
        </div>
        <button
          @click="copyRegex"
          class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
        >
          Copy
        </button>
      </div>
    </div>
    <div class="mb-4">
      <label for="testString" class="block text-sm font-medium text-gray-700">Test String:</label>
      <textarea
        id="testString"
        v-model="testString"
        placeholder="Enter text to test against the regex..."
        class="mt-1 block w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        rows="6"
      ></textarea>
    </div>
    <div class="mb-4">
      <button
        @click="testRegex"
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Test Regex
      </button>
    </div>
    <div v-if="error" class="mb-4 rounded border border-red-300 bg-red-50 p-4">
      <p class="text-red-800">{{ error }}</p>
    </div>
    <div v-if="results.length > 0" class="mb-4">
      <h2 class="mb-2 text-lg font-semibold">Matches:</h2>
      <div class="space-y-2">
        <div v-for="(match, index) in results" :key="index" class="rounded border p-4">
          <p class="font-medium">Match {{ index + 1 }}: "{{ match[0] }}"</p>
          <p v-if="match.length > 1" class="text-sm text-gray-600">
            Groups: {{ match.slice(1).join(", ") }}
          </p>
          <p class="text-sm text-gray-500">Index: {{ match.index }}</p>
        </div>
      </div>
    </div>
    <div
      v-else-if="results.length === 0 && tested"
      class="mb-4 rounded border border-green-300 bg-green-50 p-4"
    >
      <p class="text-green-800">No matches found.</p>
    </div>
    <div class="mt-8">
      <h2 class="mb-4 text-xl font-bold">Regex Cheatsheet</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Pattern</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Character Classes</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">\d</td>
              <td class="border border-gray-300 px-4 py-2">Any digit (0-9)</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Character Classes</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">\D</td>
              <td class="border border-gray-300 px-4 py-2">Any non-digit</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Character Classes</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">\w</td>
              <td class="border border-gray-300 px-4 py-2">
                Any word character (a-z, A-Z, 0-9, _)
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Character Classes</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">\W</td>
              <td class="border border-gray-300 px-4 py-2">Any non-word character</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Character Classes</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">\s</td>
              <td class="border border-gray-300 px-4 py-2">Any whitespace character</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Character Classes</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">\S</td>
              <td class="border border-gray-300 px-4 py-2">Any non-whitespace character</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Character Classes</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">.</td>
              <td class="border border-gray-300 px-4 py-2">Any character (except newline)</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Quantifiers</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">*</td>
              <td class="border border-gray-300 px-4 py-2">Zero or more</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Quantifiers</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">+</td>
              <td class="border border-gray-300 px-4 py-2">One or more</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Quantifiers</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">?</td>
              <td class="border border-gray-300 px-4 py-2">Zero or one</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Quantifiers</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">{n}</td>
              <td class="border border-gray-300 px-4 py-2">Exactly n times</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Quantifiers</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">{n,}</td>
              <td class="border border-gray-300 px-4 py-2">n or more times</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Quantifiers</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">{n,m}</td>
              <td class="border border-gray-300 px-4 py-2">Between n and m times</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Anchors</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">^</td>
              <td class="border border-gray-300 px-4 py-2">Start of string</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Anchors</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">$</td>
              <td class="border border-gray-300 px-4 py-2">End of string</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Anchors</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">\b</td>
              <td class="border border-gray-300 px-4 py-2">Word boundary</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Anchors</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">\B</td>
              <td class="border border-gray-300 px-4 py-2">Non-word boundary</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Common Patterns</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">[a-zA-Z]</td>
              <td class="border border-gray-300 px-4 py-2">Any letter</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Common Patterns</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">[0-9]</td>
              <td class="border border-gray-300 px-4 py-2">Any digit</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Common Patterns</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">(a|b)</td>
              <td class="border border-gray-300 px-4 py-2">a or b</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Common Patterns</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">(?:...)</td>
              <td class="border border-gray-300 px-4 py-2">Non-capturing group</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-2 font-medium">Common Patterns</td>
              <td class="border border-gray-300 px-4 py-2 font-mono">(?&lt;name&gt;...)</td>
              <td class="border border-gray-300 px-4 py-2">Named capture group</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const regexPattern = ref("[a-zA-Z0-9]+");
const selectedFlags = ref<string[]>(["g"]);
const testString = ref("My Test String 12345");
const results = ref<RegExpExecArray[]>([]);
const error = ref("");
const tested = ref(false);

const goBack = () => {
  router.go(-1);
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const copyRegex = () => {
  const fullRegex = `/${regexPattern.value}/${selectedFlags.value.join("")}`;
  copyToClipboard(fullRegex);
};

const testRegex = () => {
  error.value = "";
  results.value = [];
  tested.value = true;

  if (!regexPattern.value.trim()) {
    error.value = "Please enter a regex pattern.";
    return;
  }

  if (!testString.value.trim()) {
    error.value = "Please enter a test string.";
    return;
  }

  try {
    const regex = new RegExp(regexPattern.value, selectedFlags.value.join(""));
    const matches = [];
    let match;
    while ((match = regex.exec(testString.value)) !== null) {
      matches.push(match);
      if (!regex.global) break;
    }
    results.value = matches;
  } catch (err) {
    error.value = `Invalid regex: ${(err as Error).message}`;
  }
};
</script>
