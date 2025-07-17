# Sunrise Maintenance CRM

A modern, full-featured Customer Relationship Management system designed specifically for snow plowing and maintenance businesses.

## Features

- **Customer Management** - Track companies, contacts, and deals
- **Dashboard Analytics** - Revenue tracking and performance metrics
- **AI Phone Service** - Automated call handling and appointment booking
- **Weather Integration** - Real-time snow tracking for maintenance scheduling
- **Mobile Responsive** - Works perfectly on all devices
- **Modern UI** - Built with React, TypeScript, and Tailwind CSS

## Quick Start

### Prerequisites
- **Node.js 18+** from [nodejs.org](https://nodejs.org)
- **Terminal/Command Prompt**
- **Web Browser**

### Installation

1. **Open Terminal**
   - Windows: Win + R → type `cmd` → Enter
   - Mac: Cmd + Space → type `terminal` → Enter
   - Linux: Ctrl + Alt + T

2. **Navigate to project folder**
   ```bash
   cd path/to/project
   ```

3. **Install dependencies** (takes 2-5 minutes)
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**: http://localhost:5173

## Troubleshooting

### Common Issues
- **"npm not found"** → Install Node.js from nodejs.org
- **"Port in use"** → Use different port: `npm run dev -- --port 3000`
- **Install fails** → Clear cache: `npm cache clean --force`
- **Blank page** → Check terminal for errors

### Quick Fixes
```bash
# Use different port
npm run dev -- --port 3000

# Clear npm cache
npm cache clean --force

# Fresh installation
rm -rf node_modules package-lock.json
npm install
```

## Available Commands

| Command | Purpose |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Supabase** for database
- **Radix UI** components
- **React Router** for navigation
- **Recharts** for analytics

## Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── lib/           # Utilities and configurations
├── hooks/         # Custom React hooks
├── contexts/      # React contexts
└── main.tsx       # Application entry point
```

## Documentation

- **QUICK_START.md** - Get running in 3 minutes
- **INSTALLATION_GUIDE.md** - Detailed setup instructions
- **SETUP_GUIDE.md** - Complete configuration guide
- **TROUBLESHOOTING.md** - Common issues and solutions
- **DEVELOPMENT_GUIDE.md** - Development workflow

## Support

If you encounter any issues:
1. Check the troubleshooting guides
2. Verify Node.js 18+ is installed
3. Try a fresh installation
4. Contact support

---

**Ready to use in 3 simple steps:**
1. `npm install`
2. `npm run dev`
3. Open http://localhost:5173

That's it! Your CRM is now running locally.