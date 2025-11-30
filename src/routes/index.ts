import type { RouteRecordRaw } from "vue-router";

import {
  ColorConverterPage,
  CsvViewerPage,
  HomePage,
  ImageConverterPage,
  JavaScriptRegexTestPage,
  JsonViewerPage,
  JwtDecoderPage,
  MarkdownViewerPage,
  MetaGeneratorPage,
  MinifyPrettifyPage,
  NpmScriptPage,
  OnKeyDownPage,
  QueryParamsParserPage,
  RegexLibraryPage,
  ResumePage,
  StringConverterPage,
  TextDiffViewerPage,
  TextGeneratorPage,
  TimestampToDatePage,
  UrlEncoderDecoderPage,
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
  jwtDecoder: "jwt-decoder",
  textDiffViewer: "text-diff-viewer",
  colorConverter: "color-converter",
  urlEncoderDecoder: "url-encoder-decoder",
  markdownViewer: "markdown-viewer",
  csvViewer: "csv-viewer",
  metaGenerator: "meta-generator",
  queryParamsParser: "query-params-parser",
  regexLibrary: "regex-library",
  imageConverter: "image-converter",
  minifyPrettify: "minify-prettify",
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
    path: "/jwt-decoder",
    name: pathNames.jwtDecoder,
    component: JwtDecoderPage,
  },
  {
    path: "/text-diff-viewer",
    name: pathNames.textDiffViewer,
    component: TextDiffViewerPage,
  },
  {
    path: "/color-converter",
    name: pathNames.colorConverter,
    component: ColorConverterPage,
  },
  {
    path: "/url-encoder-decoder",
    name: pathNames.urlEncoderDecoder,
    component: UrlEncoderDecoderPage,
  },
  {
    path: "/query-params-parser",
    name: pathNames.queryParamsParser,
    component: QueryParamsParserPage,
  },
  {
    path: "/regex-library",
    name: pathNames.regexLibrary,
    component: RegexLibraryPage,
  },
  {
    path: "/image-converter",
    name: pathNames.imageConverter,
    component: ImageConverterPage,
  },
  {
    path: "/minify-prettify",
    name: pathNames.minifyPrettify,
    component: MinifyPrettifyPage,
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
