# JS Analyzer 🔍

![Go](https://img.shields.io/badge/Language-Go-00ADD8?style=flat&logo=go)
![GitHub](https://img.shields.io/github/license/Petersudo01/JS-analyzer?style=flat)
![GitHub Repo Size](https://img.shields.io/github/repo-size/Petersudo01/JS-analyzer?style=flat)

JS Analyzer is a **powerful static analysis tool for JavaScript files** built in **Go**. It helps developers and security engineers detect:

- Dangerous functions (`eval`, `Function`, `exec`, etc.)
- Sensitive data exposure (`api_key`, `token`, `password`, `secret`, `PRIVATE_KEY`)
- Frameworks used and their versions (React, Angular, Vue, Next.js, Express)

---

## 🛠 Features

- **Concurrent pipeline** using Go channels for high-speed analysis.
- Color-coded CLI output for readability.
- Detects **dangerous functions** and **secrets**.
- Detects **frameworks and versions** using regex.
- Saves structured JSON report for automated processing.
- Modular architecture (Stage1 → Stage5) for easy extension.

---

## 📦 Folder Structure

```text
JS-analyzer/
├─ Stages/       # Go source code for each stage
├─ Tests/        # JavaScript files for testing
├─ Report/       # Saved JSON reports
├─ go.mod
├─ main.go       # Entry point
