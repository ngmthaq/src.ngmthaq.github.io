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
    <h1 class="mb-4 text-2xl font-bold">NPM Script Generator</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Paste your package.json content below to generate install scripts for dependencies and dev
      dependencies.
    </p>

    <div v-if="error" class="mb-4 rounded border border-red-300 bg-red-50 p-4">
      <p class="text-red-800">{{ error }}</p>
    </div>

    <div class="mb-4">
      <label for="packageJson" class="mb-2 block text-sm font-medium text-gray-700">
        Package.json Content
      </label>
      <textarea
        id="packageJson"
        v-model="packageJsonInput"
        placeholder='{"name": "my-app", "dependencies": {"vue": "^3.0.0"}, "devDependencies": {"vite": "^4.0.0"}}'
        class="h-64 w-full resize-none rounded-md border border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        rows="10"
      ></textarea>
    </div>

    <div class="mb-4">
      <label class="mb-2 block text-sm font-medium text-gray-700">Package Manager</label>
      <div class="flex gap-6">
        <label class="flex items-center">
          <input
            v-model="packageManager"
            type="radio"
            value="npm"
            class="mr-2 h-4 w-4 border border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          npm
        </label>
        <label class="flex items-center">
          <input
            v-model="packageManager"
            type="radio"
            value="yarn"
            class="mr-2 h-4 w-4 border border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          yarn
        </label>
        <label class="flex items-center">
          <input
            v-model="packageManager"
            type="radio"
            value="pnpm"
            class="mr-2 h-4 w-4 border border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          pnpm
        </label>
      </div>
    </div>

    <div class="mb-4 flex gap-2">
      <button
        @click="generateScripts"
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Generate Scripts
      </button>
      <button
        @click="clearAll"
        class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
      >
        Clear
      </button>
    </div>

    <div v-if="generatedScripts.dependencies || generatedScripts.devDependencies" class="mb-4">
      <h2 class="mb-2 text-lg font-semibold">Generated Install Scripts</h2>
      <div class="space-y-4">
        <div v-if="generatedScripts.dependencies" class="rounded border border-gray-300 p-4">
          <h3 class="mb-2 font-medium text-gray-900">Dependencies</h3>
          <div class="rounded bg-gray-100 p-3 font-mono text-sm">
            {{ generatedScripts.dependencies }}
          </div>
        </div>
        <div v-if="generatedScripts.devDependencies" class="rounded border border-gray-300 p-4">
          <h3 class="mb-2 font-medium text-gray-900">Dev Dependencies</h3>
          <div class="rounded bg-gray-100 p-3 font-mono text-sm">
            {{ generatedScripts.devDependencies }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const packageJsonInput = ref("");
const packageManager = ref("npm");
const error = ref("");
const generatedScripts = ref({
  dependencies: "",
  devDependencies: "",
});

const goBack = () => {
  router.go(-1);
};

const generateScripts = () => {
  error.value = "";
  generatedScripts.value = { dependencies: "", devDependencies: "" };

  if (!packageJsonInput.value.trim()) {
    error.value = "Please enter package.json content.";
    return;
  }

  try {
    const packageJson = JSON.parse(packageJsonInput.value);

    if (!packageJson.dependencies && !packageJson.devDependencies) {
      error.value = "No dependencies or devDependencies found in package.json.";
      return;
    }

    // Generate dependencies script
    if (packageJson.dependencies && Object.keys(packageJson.dependencies).length > 0) {
      const deps = Object.keys(packageJson.dependencies);
      generatedScripts.value.dependencies = generateInstallCommand(deps, false);
    }

    // Generate devDependencies script
    if (packageJson.devDependencies && Object.keys(packageJson.devDependencies).length > 0) {
      const devDeps = Object.keys(packageJson.devDependencies);
      generatedScripts.value.devDependencies = generateInstallCommand(devDeps, true);
    }
  } catch (err) {
    error.value = `Invalid JSON: ${(err as Error).message}`;
  }
};

const generateInstallCommand = (packages: string[], isDev: boolean): string => {
  const packageList = packages.join(" ");

  switch (packageManager.value) {
    case "npm":
      return isDev ? `npm install --save-dev ${packageList}` : `npm install ${packageList}`;
    case "yarn":
      return isDev ? `yarn add --dev ${packageList}` : `yarn add ${packageList}`;
    case "pnpm":
      return isDev ? `pnpm add --save-dev ${packageList}` : `pnpm add ${packageList}`;
    default:
      return "";
  }
};

const clearAll = () => {
  packageJsonInput.value = "";
  generatedScripts.value = { dependencies: "", devDependencies: "" };
  error.value = "";
};
</script>

<style scoped></style>
