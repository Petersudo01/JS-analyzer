// challenge.js

// Secrets scattered in code
const api_key = "123ABC";
let token = "token_987";
var password = "qwerty123";
const PRIVATE_KEY = "ssh-rsa AAAAB3Nza";

// Dangerous functions
function runEval() {
    eval("console.log('Hello from eval')");
}

const runFunction = new Function("console.log('Function constructor')");
setTimeout(() => {
    console.log("Timeout triggered");
}, 500);

setInterval(() => {
    console.log("Interval triggered");
}, 1000);

function nested() {
    Function("alert('Nested Function!')")();
}

// Async tricky
async function asyncFunc() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    eval("console.log('Async eval')");
}

// Frameworks imports
import React from "react";
import Vue from "vue@3.2.0";
import { Component } from "@angular/core";
import Next from "next@13.4.1";

// Random safe code
console.log("Just a test");
