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
    <h1 class="mb-4 text-2xl font-bold">Color Converter</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Enter a color in any format (HEX, RGB, HSL) and see conversions with previews.
    </p>

    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div>
        <label for="hexInput" class="mb-2 block text-sm font-medium text-gray-700"> HEX: </label>
        <input
          id="hexInput"
          v-model="hex"
          type="text"
          placeholder="#ff0000"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          @input="updateFromHex"
        />
      </div>
      <div>
        <label for="rgbInput" class="mb-2 block text-sm font-medium text-gray-700"> RGB: </label>
        <input
          id="rgbInput"
          v-model="rgb"
          type="text"
          placeholder="rgb(255, 0, 0)"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          @input="updateFromRgb"
        />
      </div>
      <div>
        <label for="hslInput" class="mb-2 block text-sm font-medium text-gray-700"> HSL: </label>
        <input
          id="hslInput"
          v-model="hsl"
          type="text"
          placeholder="hsl(0, 100%, 50%)"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          @input="updateFromHsl"
        />
      </div>
    </div>

    <div class="mb-6 flex items-center gap-4">
      <div
        class="h-16 w-16 rounded-md border-2 border-gray-300 shadow-sm"
        :style="{ backgroundColor: hex }"
      ></div>
      <div>
        <p class="text-sm text-gray-700">Color Preview</p>
      </div>
    </div>

    <div class="mb-4">
      <label class="mb-2 block text-sm font-medium text-gray-700">Generated Code:</label>
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <code class="flex-1 rounded bg-gray-100 p-2 text-sm">{{ tailwindClass }}</code>
          <button
            @click="copyTailwind"
            class="w-48 rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy Tailwind Class
          </button>
        </div>
        <div class="flex items-center gap-2">
          <code class="flex-1 rounded bg-gray-100 p-2 text-sm">{{ cssVariable }}</code>
          <button
            @click="copyCss"
            class="w-48 rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy CSS Variable
          </button>
        </div>
      </div>
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const hex = ref("#ff0000");
const rgb = ref("rgb(255, 0, 0)");
const hsl = ref("hsl(0, 100%, 50%)");

const tailwindClass = ref("bg-[#ff0000]");
const cssVariable = ref("--primary-color: #ff0000;");

// Conversion functions
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const parseRgb = (rgbStr: string): { r: number; g: number; b: number } | null => {
  const match = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (match) {
    return {
      r: parseInt(match[1]!),
      g: parseInt(match[2]!),
      b: parseInt(match[3]!),
    };
  }
  return null;
};

const parseHsl = (hslStr: string): { h: number; s: number; l: number } | null => {
  const match = hslStr.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/);
  if (match) {
    return {
      h: parseInt(match[1]!),
      s: parseInt(match[2]!),
      l: parseInt(match[3]!),
    };
  }
  return null;
};

const updateFromHex = () => {
  const rgbObj = hexToRgb(hex.value);
  if (rgbObj) {
    rgb.value = `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
    const hslObj = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);
    hsl.value = `hsl(${Math.round(hslObj.h)}, ${Math.round(hslObj.s)}%, ${Math.round(hslObj.l)}%)`;
    updateOutputs();
  }
};

const updateFromRgb = () => {
  const rgbObj = parseRgb(rgb.value);
  if (rgbObj) {
    hex.value = rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b);
    const hslObj = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);
    hsl.value = `hsl(${Math.round(hslObj.h)}, ${Math.round(hslObj.s)}%, ${Math.round(hslObj.l)}%)`;
    updateOutputs();
  }
};

const updateFromHsl = () => {
  const hslObj = parseHsl(hsl.value);
  if (hslObj) {
    const rgbObj = hslToRgb(hslObj.h, hslObj.s, hslObj.l);
    hex.value = rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b);
    rgb.value = `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
    updateOutputs();
  }
};

const updateOutputs = () => {
  tailwindClass.value = `bg-[${hex.value}]`;
  cssVariable.value = `--primary-color: ${hex.value};`;
};

const copyTailwind = async () => {
  try {
    await navigator.clipboard.writeText(tailwindClass.value);
    alert("Tailwind class copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    const textArea = document.createElement("textarea");
    textArea.value = tailwindClass.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Tailwind class copied to clipboard!");
  }
};

const copyCss = async () => {
  try {
    await navigator.clipboard.writeText(cssVariable.value);
    alert("CSS variable copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    const textArea = document.createElement("textarea");
    textArea.value = cssVariable.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("CSS variable copied to clipboard!");
  }
};

const goBack = () => {
  router.go(-1);
};

const clearAll = () => {
  hex.value = "";
  rgb.value = "";
  hsl.value = "";
  tailwindClass.value = "";
  cssVariable.value = "";
};

// Initialize
updateOutputs();
</script>

<style scoped></style>
