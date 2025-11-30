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
    <h1 class="mb-4 text-2xl font-bold">Image Converter</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Upload images and convert them to different formats (PNG, JPG, WEBP). Optional compression
      available.
    </p>

    <!-- Upload Section -->
    <div class="mb-6">
      <label for="imageInput" class="mb-2 block text-sm font-medium text-gray-700">
        Select Images:
      </label>
      <input
        id="imageInput"
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        @change="handleFileSelect"
        class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <!-- Conversion Options -->
    <div v-if="selectedFiles.length > 0" class="mb-6">
      <h2 class="mb-2 text-lg font-semibold">Conversion Options</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Output Format:</label>
          <select
            v-model="outputFormat"
            class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700"
            >Quality (JPG/WEBP only):</label
          >
          <input
            v-model.number="quality"
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">{{ Math.round(quality * 100) }}%</div>
        </div>
      </div>
      <div class="mt-4 flex gap-2">
        <button
          @click="convertImages"
          :disabled="isConverting"
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {{ isConverting ? "Converting..." : "Convert Images" }}
        </button>
        <button
          @click="clearAll"
          class="rounded border border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Selected Files Preview -->
    <div v-if="selectedFiles.length > 0" class="mb-6">
      <h2 class="mb-2 text-lg font-semibold">Selected Files ({{ selectedFiles.length }})</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="rounded-md border border-gray-300 bg-gray-50 p-4"
        >
          <div class="mb-2 flex items-center justify-between">
            <span class="truncate text-sm font-medium text-gray-800">{{ file.name }}</span>
            <button
              @click="removeFile(index)"
              class="text-red-500 hover:text-red-700"
              title="Remove file"
            >
              ✕
            </button>
          </div>
          <img :src="file.preview" :alt="file.name" class="h-32 w-full rounded object-cover" />
          <div class="mt-2 text-xs text-gray-600">Size: {{ formatFileSize(file.size) }}</div>
        </div>
      </div>
    </div>

    <!-- Conversion Results -->
    <div v-if="convertedFiles.length > 0" class="mb-6">
      <h2 class="mb-2 text-lg font-semibold">Converted Files</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(file, index) in convertedFiles"
          :key="index"
          class="rounded-md border border-green-300 bg-green-50 p-4"
        >
          <div class="mb-2 flex items-center justify-between">
            <span class="truncate text-sm font-medium text-gray-800">{{ file.name }}</span>
            <button
              @click="downloadFile(file)"
              class="rounded bg-green-500 px-2 py-1 text-xs font-bold text-white hover:bg-green-700"
            >
              Download
            </button>
          </div>
          <img :src="file.preview" :alt="file.name" class="h-32 w-full rounded object-cover" />
          <div class="mt-2 text-xs text-gray-600">
            Original: {{ formatFileSize(file.originalSize) }} → Converted:
            {{ formatFileSize(file.size) }}
            <span v-if="file.compressionRatio" class="text-green-600">
              ({{ file.compressionRatio }}% smaller)
            </span>
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

interface SelectedFile {
  file: File;
  name: string;
  size: number;
  preview: string;
}

interface ConvertedFile {
  name: string;
  blob: Blob;
  preview: string;
  size: number;
  originalSize: number;
  compressionRatio?: string;
}

const fileInput = ref<HTMLInputElement>();
const selectedFiles = ref<SelectedFile[]>([]);
const convertedFiles = ref<ConvertedFile[]>([]);
const outputFormat = ref<"png" | "jpg" | "webp">("png");
const quality = ref(0.8);
const isConverting = ref(false);

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files) return;

  // Clear previous selections
  selectedFiles.value = [];
  convertedFiles.value = [];

  Array.from(files).forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        selectedFiles.value.push({
          file,
          name: file.name,
          size: file.size,
          preview: result,
        });
      };
      reader.readAsDataURL(file);
    }
  });
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
  convertedFiles.value = [];
};

const convertImages = async () => {
  if (selectedFiles.value.length === 0) return;

  isConverting.value = true;
  convertedFiles.value = [];

  try {
    for (const selectedFile of selectedFiles.value) {
      const converted = await convertImage(selectedFile);
      if (converted) {
        convertedFiles.value.push(converted);
      }
    }
  } catch (error) {
    console.error("Conversion error:", error);
    alert("An error occurred during conversion. Please try again.");
  } finally {
    isConverting.value = false;
  }
};

const convertImage = async (selectedFile: SelectedFile): Promise<ConvertedFile | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(null);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      let mimeType: string;
      let qualityValue: number | undefined;

      switch (outputFormat.value) {
        case "jpg":
          mimeType = "image/jpeg";
          qualityValue = quality.value;
          break;
        case "webp":
          mimeType = "image/webp";
          qualityValue = quality.value;
          break;
        case "png":
        default:
          mimeType = "image/png";
          break;
      }

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }

          const compressionRatio =
            selectedFile.size > 0
              ? Math.round(((selectedFile.size - blob.size) / selectedFile.size) * 100)
              : 0;

          // Create preview for the converted image
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            resolve({
              name: getConvertedFileName(selectedFile.name),
              blob,
              preview: result,
              size: blob.size,
              originalSize: selectedFile.size,
              compressionRatio: compressionRatio > 0 ? compressionRatio.toString() : undefined,
            });
          };
          reader.readAsDataURL(blob);
        },
        mimeType,
        qualityValue,
      );
    };

    img.src = selectedFile.preview;
  });
};

const getConvertedFileName = (originalName: string): string => {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
  const extension = outputFormat.value;
  return `${nameWithoutExt}.${extension}`;
};

const downloadFile = (file: ConvertedFile) => {
  const url = URL.createObjectURL(file.blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const clearAll = () => {
  selectedFiles.value = [];
  convertedFiles.value = [];
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped></style>
