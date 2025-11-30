import type { RouteRecordRaw } from "vue-router";

import { ResumePage } from "@/pages";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    redirect: {
      name: "resume",
    },
  },
  {
    path: "/resume",
    name: "resume",
    component: ResumePage,
  },
];
