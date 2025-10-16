Absolutely! Here's a **very professional, detailed, and GitHub-ready README** for your **JS Analyzer** project, with badges, structure, installation, usage, examples, and tips. You can copy this directly into your `README.md`.

markdown
# JS Analyzer 🔍

![Go](https://img.shields.io/badge/Language-Go-00ADD8?style=flat&logo=go)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
![GitHub Repo Size](https://img.shields.io/github/repo-size/Petersudo01/JS-analyzer?style=flat)
![GitHub last commit](https://img.shields.io/github/last-commit/Petersudo01/JS-analyzer?style=flat)

JS Analyzer is a **powerful static analysis tool for JavaScript files** built in **Go**. It helps developers, security engineers, and auditors detect:

- Dangerous functions like `eval`, `Function`, `exec`, `setTimeout`, `setInterval`
- Sensitive data exposure like `api_key`, `token`, `password`, `secret`, `PRIVATE_KEY`
- Frameworks used and their versions (React, Angular, Vue, Next.js, Express)

---

## 🚀 Features

- **Concurrent pipeline** using Go channels for high-speed analysis
- **Color-coded CLI output** for easy reading
- Detects **dangerous functions** and **sensitive data**
- Detects **frameworks and versions** via regex
- Saves **structured JSON reports** for automation
- Modular architecture (Stage1 → Stage5) for maintainability and extensibility

---

## 📁 Project Structure

```text
JS-analyzer/
├─ Stages/       # Go source code for each stage
├─ Tests/        # JavaScript files for testing
├─ Report/       # Saved JSON reports
├─ go.mod
├─ main.go       # Entry point
├─ LICENSE       # MIT License
├─ README.md
````

---

## ⚙️ Installation

### Prerequisites

* [Go 1.23+](https://golang.org/dl/)
* Git

Clone the repository:

```bash
git clone git@github.com:Petersudo01/JS-analyzer.git
cd JS-analyzer
```

---

## 💻 Usage

Run the analyzer on a JavaScript file:

```bash
go run . <filename.js>
```

Example:

```bash
go run . full_test.js
```

Expected output:

```
🚀 Starting analysis for file: full_test.js
🔍 Stage3 Analyzer working...

📊 Analysis results for file: full_test.js
[⚠️] secret - Line 2
[⚠️] api_key - Line 12
[⚙️ FRAMEWORK] React v17.0.2
✅ Report saved as report.json
🚀 Analysis finished successfully!
```

* JSON reports are saved automatically in `Report/`.

---

## 🛠 Stages Explained

1. **Stage1: Scanner** – Reads the filename and sends it to the parser.
2. **Stage2: Parser** – Reads the file contents and sends code to the analyzer.
3. **Stage3: Analyzer** – Detects dangerous functions and secrets.
4. **Stage4: Framework Detector** – Detects frameworks and their versions.
5. **Stage5: Reporter** – Prints results to the console and saves a JSON report.

---

## 📄 JSON Report Structure

```json
{
  "file": "example.js",
  "dangerous_functions": [
    {
      "type": "Dangerous Function",
      "detail": "eval",
      "line": 10,
      "severity": "high"
    }
  ],
  "secrets": [
    {
      "type": "Sensitive Data",
      "detail": "api_key",
      "line": 4,
      "severity": "medium"
    }
  ],
  "frameworks": [
    {
      "name": "React",
      "version": "17.0.2"
    }
  ]
}
```

---

## 🧪 Test Files

* `Tests/test.js` – Simple test with a few dangerous functions
* `Tests/full_test.js` – Complex test covering secrets, dangerous functions, and frameworks
* `Tests/mega_challenge.js` – Real-world challenging JS file for full analysis

---

## 💡 Tips & Best Practices

* Extend `Stage4Framework` regex patterns to detect more frameworks
* Add more keywords in `Stage3Analyzer` for new secrets
* Use Go channels to add more concurrent stages if needed
* Always keep test files in the `Tests/` folder

---

## 📝 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Peter Osama** – [GitHub](https://github.com/Petersudo01) | [peterosama.20003@gmail.com](mailto:peterosama.20003@gmail.com)


