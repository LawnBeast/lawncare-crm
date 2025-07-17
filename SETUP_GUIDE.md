# Setup Guide - Sunrise Maintenance CRM

## Complete Setup Instructions

### Step 1: Prerequisites
- **Download Node.js** from [nodejs.org](https://nodejs.org)
- **Choose LTS version** (18.x or higher)
- **Install and restart** your computer
- **Verify installation:** `node --version`

### Step 2: Open Terminal
- **Windows:** Press Win + R, type "cmd", press Enter
- **Mac:** Press Cmd + Space, type "terminal", press Enter
- **Linux:** Press Ctrl + Alt + T
- **Navigate to project folder:** `cd path/to/project`

### Step 3: Install & Run

**Install dependencies (takes 2-5 minutes)**
```bash
npm install
```

**Start development server**
```bash
npm run dev
```

**Open browser to:** http://localhost:5173

---

## Troubleshooting

### Common Issues
- **"npm not found"** → Install Node.js
- **"Port in use"** → Use different port
- **Install fails** → Clear cache
- **Blank page** → Check terminal errors

### Quick Fixes

**Use different port**
```bash
npm run dev -- --port 3000
```

**Clear npm cache**
```bash
npm cache clean --force
```

**Fresh installation**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Check Node.js version**
```bash
node --version
# Should show v18.x.x or higher
```

---

## What's Included

### Core Features
- **Customer Management** - Companies, contacts, deals
- **Dashboard Analytics** - Revenue, pipeline, performance
- **AI Phone Service** - Automated call handling
- **Weather Integration** - Snow tracking for maintenance
- **Mobile Responsive** - Works on all devices

### Tech Stack
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Supabase** for database
- **Radix UI** components

### File Structure
```
src/
├── components/     # React components
├── pages/         # Page components
├── lib/           # Utilities
├── hooks/         # Custom hooks
└── contexts/      # React contexts
```

---

## Next Steps

1. **Explore the app** - Test all features
2. **Customize branding** - Update colors, logos
3. **Configure database** - Set up Supabase
4. **Deploy to production** - Build and host
5. **Start reselling** - Package for clients

## Support

If setup fails:
1. Check TROUBLESHOOTING.md
2. Verify Node.js 18+ installed
3. Try fresh installation
4. Contact support

---

**Success!** Your CRM should now be running at http://localhost:5173