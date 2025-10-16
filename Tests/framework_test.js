// framework_test.js
// Test many import/require/dynamic-import formats and version styles.

// 1) plain imports
import React from "react";
import Vue from "vue";
import { Component } from "@angular/core";

// 2) imports with explicit versions in the string (some projects inline versions)
import VueWithVersion from "vue@3.2.1";
import NextWithVersion from "next@13.4.1";

// 3) require() forms
const reactReq = require("react");
const expressReq = require("express"); // commonjs

// 4) scoped package without version
import NgCore from "@angular/core";

// 5) scoped with version-like string (edge case)
const scopedWithVersion = "@scope/pkg@1.2.3"; // not a real framework, but parser should ignore

// 6) dynamic import
(async () => {
  const mod = await import("next@13.4.1");
})();

// 7) package-like patterns in code (should be picked by regex scan)
const inline = "react@17.0.2";
const another = "vue@2.6.14 and some noise";

// 8) imports inside comments or strings (should be ignored if possible)
const str = 'import Something from "react"'; // string literal
