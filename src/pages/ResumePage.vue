<template>
  <div class="container max-w-5xl py-8" v-show="info">
    <div class="mb-2 flex justify-between border-b py-1">
      <p>{{ info?.jobTitle }}</p>
      <div class="hidden gap-3 md:flex">
        <p class="text-sm">{{ info?.gender }}</p>
        <p class="text-sm">&#9900;</p>
        <a :href="`mailto:${info?.email}`" class="text-sm text-blue-700 underline">
          {{ info?.email }}
        </a>
        <p class="text-sm">&#9900;</p>
        <a :href="`tel:${info?.phone}`" class="text-sm text-blue-700 underline">
          {{ info?.phone }}</a
        >
      </div>
    </div>
    <div class="pb-6">
      <p class="pr-2 text-3xl font-bold uppercase">{{ info?.name }}</p>
      <p class="text-md">({{ info?.englishName }})</p>
    </div>
    <div class="pb-6">
      <p class="mb-2 border-b-2 font-bold uppercase">General Information</p>
      <ul class="list-disc pl-8">
        <li v-for="(value, index) in info?.generalInformations" :key="index">
          {{ value }}
        </li>
      </ul>
    </div>
    <div class="pb-6">
      <p class="mb-2 border-b-2 font-bold uppercase">Work Experiences</p>
      <table class="w-full border-collapse border">
        <thead>
          <tr>
            <td class="w-[30%] border-collapse border p-1 font-semibold">Company</td>
            <td class="w-[30%] border-collapse border p-1 font-semibold">Duration</td>
            <td class="w-[40%] border-collapse border p-1 font-semibold">Position</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(experience, index) in info?.workExperiences" :key="index">
            <td class="border-collapse border p-1">{{ experience.company }}</td>
            <td class="border-collapse border p-1">{{ experience.duration }}</td>
            <td class="border-collapse border p-1">{{ experience.position }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pb-6">
      <p class="mb-2 border-b-2 font-bold uppercase">Education</p>
      <table class="w-full border-collapse border">
        <thead>
          <tr>
            <td class="w-[30%] border-collapse border p-1 font-semibold">School</td>
            <td class="w-[30%] border-collapse border p-1 font-semibold">Degree</td>
            <td class="w-[40%] border-collapse border p-1 font-semibold">Descriptions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(education, index) in info?.educations" :key="index">
            <td class="border-collapse border p-1">
              {{ education.school }}
              <br />
              <small>({{ education.duration }})</small>
            </td>
            <td class="border-collapse border p-1">{{ education.degree }}</td>
            <td class="border-collapse border p-1">
              <ul class="list-disc pl-5">
                <li v-for="(desc, descIndex) in education.descrioptions" :key="descIndex">
                  {{ desc }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pb-6">
      <p class="mb-2 border-b-2 font-bold uppercase">Awards and Certificates</p>
      <table class="w-full border-collapse border">
        <thead>
          <tr>
            <td class="w-[50%] border-collapse border p-1 font-semibold">Title</td>
            <td class="w-[30%] border-collapse border p-1 font-semibold">Issuer</td>
            <td class="w-[20%] border-collapse border p-1 font-semibold">Date</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(award, index) in info?.awardsAndcertificates" :key="index">
            <td class="border-collapse border p-1">{{ award.title }}</td>
            <td class="border-collapse border p-1">{{ award.issuer }}</td>
            <td class="border-collapse border p-1">{{ award.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pb-6">
      <p class="mb-2 border-b-2 font-bold uppercase">Recent Projects</p>
      <div v-for="(project, index) in info?.projects" :key="index">
        <p class="text-lg font-semibold">{{ project.name }}</p>
        <p class="mb-2 italic">{{ project.role }}</p>
        <div class="mb-2">
          <p class="font-semibold">Description:</p>
          <ul class="list-disc pl-8">
            <li v-for="(desc, descIndex) in project.description" :key="descIndex">
              {{ desc }}
            </li>
          </ul>
        </div>
        <div class="mb-2">
          <p class="font-semibold">Key Features:</p>
          <ul class="list-disc pl-8">
            <li v-for="(feature, featureIndex) in project.keyFeatures" :key="featureIndex">
              {{ feature }}
            </li>
          </ul>
        </div>
        <div>
          <p class="font-semibold">
            Technologies Used:
            <span class="font-normal">{{ project.technologies.join(", ") }}.</span>
          </p>
        </div>
        <p>---------------------------------</p>
        <br v-if="info?.projects && index < info.projects.length - 1" />
      </div>
    </div>
    <div>
      <p class="mb-2 border-b-2 font-bold uppercase">Contact Me</p>
      <ul>
        <li><strong>Name:</strong> {{ info?.name }}</li>
        <li><strong>English Name:</strong> {{ info?.englishName }}</li>
        <li>
          <strong>Email:</strong>{{ " " }}
          <a :href="`mailto:${info?.email}`" class="text-blue-700 underline">{{ info?.email }}</a>
        </li>
        <li>
          <strong>Phone:</strong>{{ " " }}
          <a :href="`tel:${info?.phone}`" class="text-blue-700 underline">{{ info?.phone }}</a>
        </li>
        <li><strong>Gender:</strong> {{ info?.gender }}</li>
      </ul>
    </div>
  </div>
  <div v-show="!info" class="flex min-h-screen items-center justify-center px-2 py-16">
    <div class="flex flex-col items-center">
      <div class="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-500"></div>
      <p class="mt-6 text-lg font-normal">Loading Resume...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from "vue";

import type { ResumeInfo } from "@/types/resume";

const info = ref<ResumeInfo | null>(null);

onBeforeMount(() => {
  console.log("Fetching info data..");
  fetch(import.meta.env.VITE_GG_SHEET_PROFLIE_URL as string)
    .then((response) => {
      console.log("Converting response to json");
      return response.json();
    })
    .then((data) => {
      console.log("Fetched info data:", data);
      info.value = data;
    })
    .catch((error) => {
      console.error("Error fetching info data:", error);
    });
});

onMounted(() => {
  document.title = "Nguyen_Manh_Thang (Victor Nguyen) Software Engineer Resume";
});
</script>
