# SBilliz Desktop Application

SBilliz is a boilerplate Electron + React + Vite desktop application project designed to help developers quickly start building modern desktop applications with SQLite support.

This project provides a ready-to-use setup with:

- React
- Vite
- Electron
- SQLite
- Electron Builder

It is intended as a starter boilerplate for building:

- Billing software
- Inventory systems
- POS applications
- Offline desktop tools
- Business management applications

---

# Features

- Electron desktop application setup
- React frontend with Vite
- Fast HMR development workflow
- SQLite database integration
- Encrypted database support
- Electron Builder packaging
- Production-ready folder structure
- IPC communication architecture
- Windows executable generation

---

# Tech Stack

## Frontend

- React
- Vite

## Desktop Runtime

- Electron

## Database

- SQLite
- better-sqlite3-multiple-ciphers

---

# Project Structure

```text id="9zz2m5"
project-root/
│
├── dist/                 # Vite production build output
├── electron/             # Electron main/preload process files
├── release/              # Electron packaged application output
├── src/                  # React source code
├── package.json
├── vite.config.js
```

---

# Installation

## Clone Repository

```bash id="7z5dfr"
git clone <your-repository-url>
cd your-repo-name
```

## Install Dependencies

```bash id="yshq3v"
npm install
```

---

# Development Mode

Run React + Electron together:

```bash id="vnuwy7"
npm run dev
```

This will:

- Start the Vite development server
- Launch Electron

---

# Production Build

## Build React App

```bash id="r4i2rq"
npm run build
```

This creates production files inside:

```text id="7a2s0s"
dist/
```

---

# Build Desktop Application

```bash id="r7w29u"
npm run dist
```

Electron Builder will generate:

- `.exe`
- installer setup
- unpacked application

inside:

```text id="q8lqlf"
release/
```

---

# Important Configuration Explanations

# package.json

## Main Entry

```json id="w6mdhq"
"main": "electron/main.js"
```

This is the entry point of the Electron application.

Electron starts execution from:

```text id="4jq30d"
electron/main.js
```

---

## Build Configuration

```json id="2oqf18"
"build": {
  "appId": "com.sbilliz.billing",
  "productName": "SBilliz",
  "files": [
    "dist/**/*",
    "electron/**/*",
    "package.json"
  ],
  "directories": {
    "output": "release"
  }
}
```

### appId

```json id="7i0y2n"
"appId": "com.sbilliz.billing"
```

Unique identifier for the application.

Format:

```text id="h6of3l"
com.companyname.appname
```

Example:

```json id="4awjzu"
"appId": "com.arun.billing"
```

---

### productName

```json id="q5g9f0"
"productName": "SBilliz"
```

Defines the desktop application name.

Example generated installer:

```text id="bg3q4m"
SBilliz Setup.exe
```

---

### files

```json id="c72lqn"
"files": [
  "dist/**/*",
  "electron/**/*",
  "package.json"
]
```

Electron Builder includes ONLY these files in the final desktop application.

Included:

- React production build
- Electron files
- package.json

---

### directories.output

```json id="6ew7pb"
"directories": {
  "output": "release"
}
```

Defines where Electron Builder stores generated files.

Generated files:

- installer
- executable
- unpacked app

Output folder:

```text id="up2u0m"
release/
```

You can rename it:

```json id="8tuj0j"
"output": "builds"
```

---

# vite.config.js

## Base Path

```js id="k0w6gi"
base: "./";
```

Fixes Electron production asset paths.

Required because Electron loads files using:

```text id="ey8s0d"
file://
```

Without this, CSS/JS assets may fail to load after packaging.

---

## Build Output Directory

```js id="r95vmt"
build: {
  outDir: "dist";
}
```

Stores React production build files inside:

```text id="7b4h8m"
dist/
```

---

# Database

The application uses:

```text id="9ttd2x"
better-sqlite3-multiple-ciphers
```

with SQLite encryption support.

Database file location:

```js id="5i9vcl"
app.getPath("userData");
```

Example Windows path:

```text id="6lx2oh"
C:\Users\<USER>\AppData\Roaming\SBilliz\
```

---

# Electron IPC Architecture

Database operations should run in the Electron main process.

Recommended flow:

```text id="v4j1x6"
Renderer Process
       ↓
IPC Communication
       ↓
Main Process
       ↓
SQLite Database
```

Use:

- `ipcMain.handle()`
- `ipcRenderer.invoke()`

for frontend-to-database communication.

---

# Packaging Notes

## Windows

Use:

```bash id="3cy6ih"
npm run dist
```

to generate:

- setup installer
- unpacked application

---

## Linux

Linux package formats like:

- `.deb`
- `.rpm`

may require:

```text id="vaf5yb"
fpm
```

If building Linux packages on Windows, use:

- WSL
- Ubuntu
- Docker
- Linux machine

---

# Common Issues

## SQLite Error

```text id="4w3e2j"
SqliteError: file is not a database
```

Possible causes:

- corrupted DB
- wrong encryption key
- opening non-encrypted DB as encrypted
- DB inside app.asar

Recommended:

- store DB in `app.getPath("userData")`
- keep encryption key consistent

---

## Electron Asset Path Issues

If CSS/JS files fail after packaging:

Ensure:

```js id="e90s0i"
base: "./";
```

exists in:

```text id="t4lyw5"
vite.config.js
```

---

# Recommended Scripts

```json id="r2g85v"
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "dist": "electron-builder"
}
```

---

# Purpose of This Boilerplate

This boilerplate is created to simplify Electron desktop application development using modern technologies.

It helps developers avoid repetitive setup work and quickly start building scalable desktop applications with:

- React UI
- SQLite database
- Secure Electron architecture
- Production packaging support

---

# Available NPM Scripts

The project includes several predefined npm scripts for development, testing, and production builds.

---

## Development Commands

### Start Full Development Environment

```bash id="0ok67l"
npm run dev
```

Runs:

- Vite development server
- Electron application

Uses:

- `concurrently`
- `cross-env`

This is the main command used during development.

---

### Start Vite Only

```bash id="77u1b2"
npm run dev:vite
```

Starts only the React + Vite frontend development server.

Default URL:

```text id="9i7ddn"
http://localhost:5173
```

---

### Start Electron with Node Script

```bash id="4f8k1u"
npm run dev:electron-node
```

Runs the custom Electron startup script:

```text id="kntgju"
scripts/start-electron.js
```

Used internally by the main development command.

---

### Start Electron After Vite Loads

```bash id="2fxw6k"
npm run dev:electron
```

Waits until Vite is running on:

```text id="b8rq6n"
tcp:5173
```

Then launches Electron using:

```text id="wr9lg6"
electronmon
```

Useful for Electron auto-reload during development.

---

# Build Commands

## Build React Production Files

```bash id="yr1o8m"
npm run dist
```

Builds the React/Vite application into:

```text id="w87uxq"
dist/
```

This command does NOT create Electron installers.

---

## Build Complete Desktop Application

```bash id="5qk4a8"
npm run build
```

Runs:

1. React production build
2. Electron Builder packaging

Generates:

- Windows executable
- installer
- unpacked app

Output location:

```text id="ndff92"
release/
```

---

## Build Windows Application

```bash id="8kr17f"
npm run build:win
```

Creates Windows desktop application files.

Generated files may include:

- `.exe`
- setup installer
- win-unpacked

---

## Build Linux Application

```bash id="q02n8u"
npm run build:linux
```

Creates Linux desktop application packages.

Possible outputs:

- AppImage
- deb
- rpm

Note:
Linux packaging may require:

```text id="fzbmpm"
fpm
```

If building on Windows, use:

- WSL
- Ubuntu
- Docker
- Linux machine

---

## Build macOS Application

```bash id="g9sq0z"
npm run build:mac
```

Creates macOS desktop application packages.

Recommended to build macOS apps on macOS systems.

---

# Dependency Commands

## Post Install

```bash id="l89i0f"
npm run postinstall
```

Runs:

```bash id="w0rjlwm"
electron-builder install-app-deps
```

Used to rebuild native Electron dependencies automatically.

Important for packages like:

- SQLite
- better-sqlite3
- native Node modules

---

# Code Quality Commands

## Run ESLint

```bash id="ff85x5"
npm run lint
```

Checks project files using ESLint.

---

# Preview Commands

## Preview Production Build

```bash id="r2th0o"
npm run preview
```

Previews the Vite production build locally before packaging.

Useful for testing:

- production assets
- routing
- frontend behavior

---

# License

This project is licensed under the MIT License.
