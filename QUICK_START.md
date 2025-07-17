# Quick Start Guide - Sunrise Maintenance CRM

## Get Running in 3 Minutes

### Prerequisites
- **Node.js 18+** from [nodejs.org](https://nodejs.org)
- **Terminal/Command Prompt**
- **Web Browser**

### Step 1: Open Terminal
- **Windows:** Win + R → type `cmd` → Enter
- **Mac:** Cmd + Space → type `terminal` → Enter  
- **Linux:** Ctrl + Alt + T

### Step 2: Navigate to Project
```bash
cd path/to/project
```
*Replace `path/to/project` with your actual folder path*

### Step 3: Install Dependencies
```bash
npm install
```
*Takes 2-5 minutes - installs React, TypeScript, Tailwind, etc.*

### Step 4: Start Development Server
```bash
npm run dev
```
*Starts local server at http://localhost:5173*

### Step 5: Open in Browser
Go to: **http://localhost:5173**

---

## Troubleshooting

### Common Issues
- **"npm not found"** → Install Node.js
- **"Port in use"** → Use different port: `npm run dev -- --port 3000`
- **Install fails** → Clear cache: `npm cache clean --force`
- **Blank page** → Check terminal for errors

### Quick Fixes
```bash
# Use different port
npm run dev -- --port 3000

# Clear npm cache
npm cache clean --force

# Fresh install
rm -rf node_modules package-lock.json
npm install
```

### Verify Installation
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version
```

---

## What You'll See

✅ **Sunrise Maintenance CRM** homepage
✅ **Live Demo** with sample data
✅ **Dashboard** with analytics
✅ **Contact Management** system
✅ **Mobile-responsive** design
✅ **Modern UI** with Tailwind CSS

## Available Commands

| Command | Purpose |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

## Stop Server
Press **Ctrl + C** in terminal

---

**That's it!** Your CRM is now running locally at http://localhost:5173

*Need more help? Check TROUBLESHOOTING.md or INSTALLATION_GUIDE.md*