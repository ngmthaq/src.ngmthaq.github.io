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
    <h1 class="mb-4 text-2xl font-bold">Regex Library</h1>
    <p class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
      ℹ️ Common regular expression patterns ready to copy and use in your projects.
    </p>

    <div class="space-y-4">
      <div
        v-for="(pattern, index) in regexPatterns"
        :key="index"
        class="rounded-md border border-gray-300 bg-gray-50 p-4"
      >
        <div class="mb-2 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">{{ pattern.name }}</h3>
          <button
            @click="copyPattern(pattern.regex)"
            class="rounded border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100"
          >
            Copy Regex
          </button>
        </div>
        <p class="mb-2 text-sm text-gray-600">{{ pattern.description }}</p>
        <div class="rounded bg-white p-3 font-mono text-sm text-gray-900">
          {{ pattern.regex }}
        </div>
        <div v-if="pattern.example" class="mt-2">
          <p class="text-xs text-gray-500">Example: {{ pattern.example }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface RegexPattern {
  name: string;
  description: string;
  regex: string;
  example?: string;
}

const regexPatterns = ref<RegexPattern[]>([
  {
    name: "Email Address",
    description: "Validates email addresses with standard format",
    regex: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/",
    example: "user@example.com",
  },
  {
    name: "Phone Number (US)",
    description: "Validates US phone numbers in various formats",
    regex: "/^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/",
    example: "(555) 123-4567",
  },
  {
    name: "URL",
    description: "Validates HTTP/HTTPS URLs",
    regex:
      "/^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$/",
    example: "https://www.example.com/path?param=value",
  },
  {
    name: "IPv4 Address",
    description: "Validates IPv4 addresses",
    regex:
      "/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/",
    example: "192.168.1.1",
  },
  {
    name: "Password (Strong)",
    description:
      "Requires at least 8 characters with uppercase, lowercase, number, and special character",
    regex: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/",
    example: "MyPass123!",
  },
  {
    name: "Slug",
    description: "Validates URL-friendly slugs (lowercase letters, numbers, hyphens)",
    regex: "/^[a-z0-9]+(?:-[a-z0-9]+)*$/",
    example: "my-awesome-post",
  },
  {
    name: "Credit Card Number",
    description: "Validates credit card numbers (basic format check)",
    regex: "/^\\d{4}\\s?\\d{4}\\s?\\d{4}\\s?\\d{4}$/",
    example: "1234 5678 9012 3456",
  },
  {
    name: "Date (YYYY-MM-DD)",
    description: "Validates dates in YYYY-MM-DD format",
    regex: "/^\\d{4}-\\d{2}-\\d{2}$/",
    example: "2023-12-25",
  },
  {
    name: "Time (HH:MM)",
    description: "Validates 24-hour time format",
    regex: "/^(?:[01]\\d|2[0-3]):[0-5]\\d$/",
    example: "14:30",
  },
  {
    name: "Hex Color",
    description: "Validates hexadecimal color codes",
    regex: "/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/",
    example: "#FF5733",
  },
  {
    name: "Username",
    description: "Validates usernames (alphanumeric, underscore, 3-20 characters)",
    regex: "/^[a-zA-Z0-9_]{3,20}$/",
    example: "john_doe123",
  },
  {
    name: "ZIP Code (US)",
    description: "Validates US ZIP codes (5 digits or 5+4 format)",
    regex: "/^\\d{5}(-\\d{4})?$/",
    example: "12345-6789",
  },
  {
    name: "Social Security Number (US)",
    description: "Validates US SSN format",
    regex: "/^\\d{3}-\\d{2}-\\d{4}$/",
    example: "123-45-6789",
  },
  {
    name: "Domain Name",
    description: "Validates domain names",
    regex: "/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$/",
    example: "example.com",
  },
  {
    name: "UUID v4",
    description: "Validates UUID version 4 format",
    regex: "/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/",
    example: "550e8400-e29b-41d4-a716-446655440000",
  },
]);

const copyPattern = async (regex: string) => {
  try {
    await navigator.clipboard.writeText(regex);
    alert("Regex pattern copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = regex;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Regex pattern copied to clipboard!");
  }
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped></style>
