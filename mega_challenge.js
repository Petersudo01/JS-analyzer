// mega_challenge.js
// A very challenging test for static string-based detectors.

// === Secrets in many shapes ===
const api_key = "AKIA" + "1234" + "_ABCD";
let token = `tok_${Math.random().toString(36).slice(2)}`;
var password = 'p@ss' + 'w0rd';
const secret = "this_is_a_secret_value";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIICeAIBADANBgkq...\n-----END PRIVATE KEY-----";

// secrets hidden by encoding
const encodedKey = "QUtJQTEyMzRfQUJDRA=="; // base64 of AKIA1234_ABCD
const hexKey = "414b4941313233345f41424344"; // hex of same

// process.env-style secret
const envKey = process.env.API_KEY || "fallback_api_key";

// === Dangerous functions direct uses ===
function doEval1() {
  eval("console.log('direct eval')");
}

const doFunction1 = new Function("x", "return x+1;");
setTimeout(() => { console.log("timeout 1"); }, 1000);
setInterval(() => { console.log("interval 1"); }, 2000);

// === Indirect / obfuscated calls that may fool naive detectors ===
const ev = "ev" + "al";
window[ev]("console.log('indirect eval via window')");
globalThis[ev]("console.log('globalThis eval')");

// Function constructor via prototype trick
const Fn = Function.constructor;
const f2 = Fn("console.log('constructed via constructor')");

// Indirect call using bracket access (no parentheses after 'eval' literal)
const eName = ['e','v','a','l'].join('');
this[eName]("console.log('joined eval')");

// tricky concatenation with "(" separated
const maybeEval = "e" + "val" + "(";
if (maybeEval.startsWith("eval")) {
  // but not actually calling - edge case
}

// === Nested / async / try-catch with eval ===
async function nestedAsync() {
  try {
    await new Promise(r => setTimeout(r, 10));
    eval("console.log('async eval')");
  } catch (e) {
    // handle
  }
}

// eval inside callback passed as string
setTimeout("console.log('string callback')", 50);

// eval disguised in string content (should not be counted but appears)
const notCall = "Here is the word eval, but not a call: eval something";

// === Dangerous commands and exec-like usage ===
const exec = require && require('child_process') ? require('child_process').exec : null;
if (exec) {
  exec("ls -la", (err, out) => console.log(out));
}

// === Minified-looking single-line code ===
(function(){var a="secret_token_abc";eval("console.log('minified eval')");})();

// === Multiple occurrences, duplicates ===
function multi() {
  eval("console.log('one')");
  eval("console.log('two')");
  Function("console.log('three')")();
}

// === Framework imports in many formats ===
// standard import
import React from "react";                  // plain
import Vue from "vue@3.2.1";               // npm-style with @version
import Next from "next@13.4.1";            // next with version
import { Component } from "@angular/core"; // angular package path

// require style
const reactReq = require("react");

// dynamic import
(async () => {
  const mod = await import("some-random-lib");
})();

// === Secrets inside objects / JSON / template literals ===
const conf = {
  api_key: "API-" + "KEY-999",
  nested: {
    token: `token-${Date.now()}`
  }
};

const bigString = `
  Lorem ipsum api_key dolor sit amet.
  password: definitely-not-a-password
  PRIVATE_KEY: -----BEGIN PRIVATE KEY-----
  ...
  -----END PRIVATE KEY-----
`;

// === False positives / comment traps & regex test cases ===
// a comment with eval( but should not be executed:
// eval("this is only in a comment")
/*
 multi-line comment:
 setTimeout(() => {}, 1000)
*/

// regex containing the word eval
const re = /eval\(/g;

// === Other tricky code ===
const stringified = "e" + "va" + "l(" + "'X')" ; // looks like eval call assembled into string
const assembledCall = (new Function("return 'assembled'"))();

// nested Function via function body
function outer() {
  return function inner() {
    Function("console.log('inner Function')")();
  }
}

// a long random string to simulate noise
const noise = "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";

// done
console.log("mega challenge file loaded");
