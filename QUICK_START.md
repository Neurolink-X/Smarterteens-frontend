# 🚀 Quick Start Guide

## Problem
The project has a nested folder structure, so `package.json` is not in the root directory.

## ✅ Solution

### Option 1: Use the Helper Script (Recommended)
```powershell
.\start-dev.ps1
```

### Option 2: Manual Navigation
```powershell
cd Smarterteens-frontend-main
npm run dev
```

### Option 3: Direct Path (One-liner)
```powershell
cd "D:\Smarterteens\Smarterteens-frontend-main\Smarterteens-frontend-main"; npm run dev
```

## 📁 Directory Structure
```
D:\Smarterteens\Smarterteens-frontend-main\          ← You are here (wrong)
└── Smarterteens-frontend-main\                      ← Project root (correct)
    ├── package.json                                 ← This is what npm needs
    ├── src\
    ├── node_modules\
    └── ...
```

## ✅ Verification
To verify you're in the correct directory:
```powershell
Test-Path package.json
# Should return: True
```

## 🎯 Always Run Commands From
```
D:\Smarterteens\Smarterteens-frontend-main\Smarterteens-frontend-main\
```

---

**Note:** The dev server should now be running. Check your terminal for the Vite output.
