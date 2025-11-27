import type { RouteRecordRaw } from "vue-router";

import { ResumePage } from "@/pages";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "resume",
    component: ResumePage,
  },
];
