# How to Run Sunrise Maintenance CRM

## Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```
*This installs all required packages (React, TypeScript, Tailwind, etc.)*

### 2. Start Development Server
```bash
npm run dev
```
*This starts the local development server*

### 3. Open in Browser
Go to: **http://localhost:5173**

---

## What You Need First

- **Node.js 18+** (download from nodejs.org)
- **Terminal/Command Prompt**
- **Web Browser**

## Detailed Steps

### Step 1: Open Terminal
- **Windows:** Press `Win + R`, type `cmd`, press Enter
- **Mac:** Press `Cmd + Space`, type `terminal`, press Enter
- **Linux:** Press `Ctrl + Alt + T`

### Step 2: Navigate to Project
```bash
cd path/to/your/project-folder
```

### Step 3: Install Everything
```bash
npm install
```
**Wait 2-5 minutes** - this downloads 50+ packages

### Step 4: Start the App
```bash
npm run dev
```

### Step 5: View Your CRM
Open browser and go to: `http://localhost:5173`

## What You'll See

✅ **Sunrise Maintenance CRM** homepage
✅ **Live Demo** button to test features
✅ **Ownership info** and pricing
✅ **Contact forms** and support
✅ **Mobile app** information
✅ **Hosting options** and payment plans

## Available Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

## Common Issues & Solutions

### "npm not found"
**Solution:** Install Node.js from nodejs.org

### "Port already in use"
**Solution:** Use different port:
```bash
npm run dev -- --port 3000
```

### Installation fails
**Solution:** Clear cache and retry:
```bash
npm cache clean --force
npm install
```

### Browser shows blank page
**Solution:** Check terminal for errors, ensure server is running

## Stop the Server

Press `Ctrl + C` in terminal to stop the development server

## Production Build

To create production-ready files:
```bash
npm run build
```

Files will be in the `dist` folder

---

## That's It!

Your CRM application is now running locally. You can:
- Test all features
- Customize the code
- Add your own branding
- Deploy to production
- Start reselling to clients

**Need help?** Check TROUBLESHOOTING.md or contact support.