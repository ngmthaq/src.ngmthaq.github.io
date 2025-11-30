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
    <h1 class="mb-4 text-2xl font-bold">Minify / Prettify Tool</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Minify or beautify your code in JavaScript, JSON, HTML, and CSS formats.
    </p>

    <!-- Language Selection -->
    <div class="mb-4">
      <label class="mb-2 block text-sm font-medium text-gray-700">Language:</label>
      <select
        v-model="selectedLanguage"
        class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="javascript">JavaScript</option>
        <option value="json">JSON</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
    </div>

    <!-- Input Section -->
    <div class="mb-4">
      <div class="mb-2 flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-700">Input Code:</label>
        <div class="flex gap-2">
          <button
            @click="minifyCode"
            class="rounded bg-red-500 px-3 py-1 text-sm font-bold text-white hover:bg-red-700"
          >
            Minify
          </button>
          <button
            @click="prettifyCode"
            class="rounded bg-green-500 px-3 py-1 text-sm font-bold text-white hover:bg-green-700"
          >
            Prettify
          </button>
          <button
            @click="clearInput"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        v-model="inputCode"
        placeholder="Paste your code here..."
        class="h-64 w-full resize-none rounded-md border border-gray-300 p-4 font-mono text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :class="{ 'border-red-500': hasError }"
      ></textarea>
    </div>

    <!-- Output Section -->
    <div v-if="outputCode" class="mb-4">
      <div class="mb-2 flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-700">Output:</label>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500">
            {{ getCompressionInfo() }}
          </span>
          <button
            @click="copyOutput"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy
          </button>
        </div>
      </div>
      <textarea
        v-model="outputCode"
        readonly
        class="h-64 w-full resize-none rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm shadow-sm"
      ></textarea>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="mb-4 rounded-md border border-red-300 bg-red-50 p-3">
      <p class="text-sm text-red-600">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const selectedLanguage = ref<"javascript" | "json" | "html" | "css">("javascript");
const inputCode = ref("");
const outputCode = ref("");
const errorMessage = ref("");

const hasError = computed(() => !!errorMessage.value);

const minifyCode = () => {
  errorMessage.value = "";
  outputCode.value = "";

  if (!inputCode.value.trim()) {
    errorMessage.value = "Please enter some code to minify.";
    return;
  }

  try {
    switch (selectedLanguage.value) {
      case "javascript":
        outputCode.value = minifyJavaScript(inputCode.value);
        break;
      case "json":
        outputCode.value = minifyJSON(inputCode.value);
        break;
      case "html":
        outputCode.value = minifyHTML(inputCode.value);
        break;
      case "css":
        outputCode.value = minifyCSS(inputCode.value);
        break;
    }
  } catch (error) {
    errorMessage.value = `Error minifying ${selectedLanguage.value}: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
};

const prettifyCode = () => {
  errorMessage.value = "";
  outputCode.value = "";

  if (!inputCode.value.trim()) {
    errorMessage.value = "Please enter some code to prettify.";
    return;
  }

  try {
    switch (selectedLanguage.value) {
      case "javascript":
        outputCode.value = prettifyJavaScript(inputCode.value);
        break;
      case "json":
        outputCode.value = prettifyJSON(inputCode.value);
        break;
      case "html":
        outputCode.value = prettifyHTML(inputCode.value);
        break;
      case "css":
        outputCode.value = prettifyCSS(inputCode.value);
        break;
    }
  } catch (error) {
    errorMessage.value = `Error prettifying ${selectedLanguage.value}: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
};

const minifyJavaScript = (code: string): string => {
  // Basic minification: remove extra whitespace and comments
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
    .replace(/\/\/.*$/gm, "") // Remove single-line comments
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\s*([{}();,:])\s*/g, "$1") // Remove spaces around operators
    .trim();
};

const prettifyJavaScript = (code: string): string => {
  // Basic prettification using simple rules
  let formatted = code;
  const indent = 0;
  const indentSize = 2;

  formatted = formatted
    .replace(/{/g, " {\n" + " ".repeat(indent * indentSize))
    .replace(/}/g, "\n" + " ".repeat((indent - 1) * indentSize) + "}")
    .replace(/;/g, ";\n" + " ".repeat(indent * indentSize))
    .replace(/,/g, ",\n" + " ".repeat(indent * indentSize));

  // Clean up excessive newlines
  formatted = formatted.replace(/\n\s*\n/g, "\n");

  return formatted.trim();
};

const minifyJSON = (code: string): string => {
  const parsed = JSON.parse(code);
  return JSON.stringify(parsed);
};

const prettifyJSON = (code: string): string => {
  const parsed = JSON.parse(code);
  return JSON.stringify(parsed, null, 2);
};

const minifyHTML = (code: string): string => {
  return code
    .replace(/>\s+</g, "><") // Remove whitespace between tags
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\s*([<>])\s*/g, "$1") // Remove spaces around angle brackets
    .trim();
};

const prettifyHTML = (code: string): string => {
  // Basic HTML prettification
  let formatted = code;
  let indent = 0;
  const indentSize = 2;

  // Add newlines before and after tags
  formatted = formatted.replace(/(<[^>]+>)/g, "\n$1\n").replace(/\n\s*\n/g, "\n");

  // Split into lines and indent
  const lines = formatted.split("\n");
  const indentedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return "";

    if (trimmed.startsWith("</")) {
      indent = Math.max(0, indent - 1);
    }

    const indented = " ".repeat(indent * indentSize) + trimmed;

    if (trimmed.startsWith("<") && !trimmed.startsWith("</") && !trimmed.endsWith("/>")) {
      indent++;
    }

    return indented;
  });

  return indentedLines.filter((line) => line.trim()).join("\n");
};

const minifyCSS = (code: string): string => {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\s*([{}:;,])\s*/g, "$1") // Remove spaces around operators
    .replace(/;}/g, "}") // Remove trailing semicolons
    .trim();
};

const prettifyCSS = (code: string): string => {
  // Basic CSS prettification
  let formatted = code;

  // Add newlines after semicolons and braces
  formatted = formatted.replace(/;/g, ";\n").replace(/{/g, " {\n").replace(/}/g, "\n}\n");

  // Indent rules
  const lines = formatted.split("\n");
  let indent = 0;
  const indentSize = 2;

  const indentedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return "";

    if (trimmed === "}") {
      indent = Math.max(0, indent - 1);
      return " ".repeat(indent * indentSize) + trimmed;
    }

    const indented = " ".repeat(indent * indentSize) + trimmed;

    if (trimmed.includes("{")) {
      indent++;
    }

    return indented;
  });

  return indentedLines.filter((line) => line.trim()).join("\n");
};

const copyOutput = async () => {
  if (!outputCode.value) return;

  try {
    await navigator.clipboard.writeText(outputCode.value);
    alert("Code copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy:", error);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = outputCode.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Code copied to clipboard!");
  }
};

const clearInput = () => {
  inputCode.value = "";
  outputCode.value = "";
  errorMessage.value = "";
};

const getCompressionInfo = (): string => {
  if (!inputCode.value || !outputCode.value) return "";

  const inputSize = new Blob([inputCode.value]).size;
  const outputSize = new Blob([outputCode.value]).size;
  const ratio = inputSize > 0 ? (((inputSize - outputSize) / inputSize) * 100).toFixed(1) : "0";

  if (inputSize > outputSize) {
    return `${ratio}% smaller`;
  } else if (inputSize < outputSize) {
    return `${Math.abs(parseFloat(ratio))}% larger`;
  } else {
    return "Same size";
  }
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped></style>
