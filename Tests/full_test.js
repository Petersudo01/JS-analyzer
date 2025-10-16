// real_world_sample_safe.js
// Safer real-world sample: secrets are read from environment variables
// and not leaked into URLs, logs, or exported defaults.

// --- frameworks & packages (various styles) ---
import React from "react";
import Next from "next@12.2.0";
const express = require("express@4.17.1");
const axios = require("axios");
import Vue from "vue@3.2.1";
import { Component } from "@angular/core";
require('dotenv').config(); // load env when running locally

// --- env and config (secure) ---
const PORT = process.env.PORT || 3000;
// REQUIRED: set these in your environment before running
const AWS_KEY = process.env.AWS_KEY || "";         // do NOT hardcode
const JWT_SECRET = process.env.JWT_SECRET || "";   // do NOT hardcode
const DB_PASSWORD = process.env.DB_PASSWORD || ""; // do NOT hardcode

if (!AWS_KEY) {
  // In production you should exit or handle missing secrets appropriately
  console.warn("Warning: AWS_KEY not set in env");
}

// --- Express server code ---
const app = express();
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // In real app, verify username/password against DB (never compare plain strings)
  const valid = password && DB_PASSWORD && password === DB_PASSWORD;
  if (valid) {
    // create a token server-side (do NOT expose secrets)
    const token = `tok-${Date.now()}`; // ephemeral token example (not secret)
    return res.json({ ok: true, token });
  }
  res.status(401).json({ ok: false });
});

// spawn child process safely: use execFile with sanitized args if needed
const child = require('child_process');
function runSafeCommand(argsArray) {
  // Only allow whitelisted commands with fixed arguments
  const allowedCmd = "/usr/bin/ls";
  child.execFile(allowedCmd, argsArray, (err, out) => {
    if (err) console.error("cmd err:", err.message);
    else {
      // Do not log potentially sensitive output in production
      console.log("cmd executed");
    }
  });
}

// --- Dynamic import & client-side code ---
async function loadFeature() {
  if (Math.random() > 0.5) {
    const mod = await import("some-lib");
    if (mod && typeof mod.init === "function") mod.init();
  }
}

// Example React component (client)
// Note: do NOT default prop values to secrets; expect the caller to pass token securely.
export function Hello(props) {
  const tokenFromProps = props.token || ""; // don't fallback to server secret
  // Avoid Function constructor and eval alternatives
  // Use safe template or precompiled templates instead
  const greeting = `Hello ${props.name || "Guest"}`;
  console.log(greeting);
  return React.createElement("div", null, greeting);
}

// Indirect evals removed — don't perform dynamic code execution in production.
// If you must run dynamic code, ensure it's sandboxed and content is fully trusted.

// timers (safe)
setTimeout(() => console.log("timer fired (non-sensitive)"), 1000);
setInterval(() => console.log("interval ping (non-sensitive)"), 3000);

// axios usage (network)
// DO NOT include secrets in query params. Use Authorization header instead.
async function fetchData() {
  try {
    const headers = {};
    if (AWS_KEY) {
      headers["Authorization"] = `Bearer ${AWS_KEY}`; // token from env
    }
    const r = await axios.get("https://api.example.com/data", { headers });
    // Process r.data securely without logging secrets
    return r.data;
  } catch (err) {
    console.error("fetch error:", err.message);
    return null;
  }
}

// Minified-looking snippet removed eval
(function(){
  const a="top_secret_value_placeholder"; // placeholder, NOT the real secret
  // No eval here — don't dynamically execute hidden code
})();

// multi occurrences demonstration (no eval)
function doManySafe() {
  // Use explicit functions rather than dynamic Function constructor
  function one() { console.log("one"); }
  function two() { console.log("two"); }
  one(); two();
}

// fetch with bearer using template literal, retrieving secret from env
async function fetchUser() {
  try {
    const token = JWT_SECRET; // token must come from env/session, not hardcoded
    if (!token) {
      console.warn("JWT secret not available for fetchUser");
      return null;
    }
    const resp = await fetch("https://api.example.com/user", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!resp.ok) return null;
    const json = await resp.json();
    return json;
  } catch (e) {
    console.error("user fetch error:", e.message);
    return null;
  }
}

// Use of process.env again (safe)
const apiKeyEnv = process.env.API_KEY || "";

// export a sample default for Next.js pages
export default function Page() {
  return React.createElement("div", null, "Next page - safe sample");
}

// Done
console.log("real_world_sample_safe loaded");
