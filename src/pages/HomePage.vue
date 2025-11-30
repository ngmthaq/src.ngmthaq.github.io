<template>
  <div class="c-card container mx-auto py-8">
    <h1 class="mb-4 text-center text-4xl font-bold">Nguyen Manh Thang</h1>
    <p class="mb-16 text-center text-lg">Welcome back! This is the home page of my application</p>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="h-40 w-[calc(25%-theme(gap.4)*3/4)] rounded bg-blue-50 text-center shadow-sm hover:shadow-lg"
      >
        <RouterLink
          :to="{ name: item.pathName }"
          class="flex h-full w-full flex-col items-center justify-center p-4 hover:text-blue-800"
        >
          <div class="mb-2 text-4xl">{{ item.icon }}</div>
          <div class="text-center">{{ item.name }}</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { pathNames } from "@/routes";

const items = ref<{ name: string; pathName: string; icon: string }[]>([
  { name: "My Resume", pathName: pathNames.resume, icon: "📄" },
  { name: "Text Generator", pathName: pathNames.textGenerator, icon: "🎲" },
  { name: "Meta Generator", pathName: pathNames.metaGenerator, icon: "🏷️" },
  { name: "NPM Script Generator", pathName: pathNames.npmScript, icon: "📦" },
  { name: "Word Counter", pathName: pathNames.wordCounter, icon: "📊" },
  { name: "On Key Down", pathName: pathNames.onKeyDown, icon: "⌨️" },
  { name: "JavaScript Regex Test", pathName: pathNames.javascriptRegexTest, icon: "🔍" },
  { name: "Regex Library", pathName: pathNames.regexLibrary, icon: "🧩" },
  { name: "Minify / Prettify Tool", pathName: pathNames.minifyPrettify, icon: "🧽" },
  { name: "Timestamp to Date", pathName: pathNames.timestampToDate, icon: "🕒" },
  { name: "String Converter", pathName: pathNames.stringConverter, icon: "🔤" },
  { name: "JSON Viewer", pathName: pathNames.jsonViewer, icon: "📋" },
  { name: "Markdown Viewer", pathName: pathNames.markdownViewer, icon: "📝" },
  { name: "CSV Viewer", pathName: pathNames.csvViewer, icon: "📊" },
  { name: "JWT Decoder", pathName: pathNames.jwtDecoder, icon: "🔐" },
  { name: "Text Diff Viewer", pathName: pathNames.textDiffViewer, icon: "🔄" },
  { name: "Color Converter", pathName: pathNames.colorConverter, icon: "🎨" },
  { name: "Image Converter", pathName: pathNames.imageConverter, icon: "🖼️" },
  { name: "URL Encoder/Decoder", pathName: pathNames.urlEncoderDecoder, icon: "🔗" },
  { name: "Query Params Parser", pathName: pathNames.queryParamsParser, icon: "⚓️" },
]);
</script>

<style scoped></style>
