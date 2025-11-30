import type { RouteRecordRaw } from "vue-router";

import {
  CsvViewerPage,
  HomePage,
  JavaScriptRegexTestPage,
  JsonViewerPage,
  MarkdownViewerPage,
  MetaGeneratorPage,
  NpmScriptPage,
  OnKeyDownPage,
  ResumePage,
  StringConverterPage,
  TextGeneratorPage,
  TimestampToDatePage,
  WordCounterPage,
} from "@/pages";

export const pathNames = {
  home: "home",
  resume: "resume",
  textGenerator: "text-generator",
  wordCounter: "word-counter",
  onKeyDown: "on-key-down",
  javascriptRegexTest: "javascript-regex-test",
  jsonViewer: "json-viewer",
  timestampToDate: "timestamp-to-date",
  npmScript: "npm-script",
  stringConverter: "string-converter",
  markdownViewer: "markdown-viewer",
  csvViewer: "csv-viewer",
  metaGenerator: "meta-generator",
};

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: pathNames.home,
    component: HomePage,
  },
  {
    path: "/resume",
    name: pathNames.resume,
    component: ResumePage,
  },
  {
    path: "/text-generator",
    name: pathNames.textGenerator,
    component: TextGeneratorPage,
  },
  {
    path: "/word-counter",
    name: pathNames.wordCounter,
    component: WordCounterPage,
  },
  {
    path: "/on-key-down",
    name: pathNames.onKeyDown,
    component: OnKeyDownPage,
  },
  {
    path: "/javascript-regex-test",
    name: pathNames.javascriptRegexTest,
    component: JavaScriptRegexTestPage,
  },
  {
    path: "/json-viewer",
    name: pathNames.jsonViewer,
    component: JsonViewerPage,
  },
  {
    path: "/timestamp-to-date",
    name: pathNames.timestampToDate,
    component: TimestampToDatePage,
  },
  {
    path: "/npm-script",
    name: pathNames.npmScript,
    component: NpmScriptPage,
  },
  {
    path: "/string-converter",
    name: pathNames.stringConverter,
    component: StringConverterPage,
  },
  {
    path: "/markdown-viewer",
    name: pathNames.markdownViewer,
    component: MarkdownViewerPage,
  },
  {
    path: "/csv-viewer",
    name: pathNames.csvViewer,
    component: CsvViewerPage,
  },
  {
    path: "/meta-generator",
    name: pathNames.metaGenerator,
    component: MetaGeneratorPage,
  },
];
