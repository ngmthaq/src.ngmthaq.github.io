/// <reference types="vite/client" />

declare module "vue3-markdown" {
  import { DefineComponent } from "vue";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const VMarkdownEditor: DefineComponent<any, any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const VMarkdownView: DefineComponent<any, any, any>;
}
