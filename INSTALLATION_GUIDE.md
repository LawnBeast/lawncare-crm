# Installation Guide for Sunrise Maintenance CRM

## Prerequisites

Before installing, ensure you have:

- **Node.js** (version 18 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`
- **Code Editor** (VS Code recommended)
  - Download from: https://code.visualstudio.com/

## Step-by-Step Installation

### Step 1: Download/Clone the Project

1. Download the project files to your computer
2. Extract to a folder (e.g., `sunrise-crm`)
3. Open terminal/command prompt
4. Navigate to the project folder:
   ```bash
   cd path/to/sunrise-crm
   ```

### Step 2: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will install 50+ dependencies including:
- React 18 + TypeScript
- Vite (build tool)
- Supabase (database)
- Radix UI components
- Tailwind CSS
- React Router
- And many more...

**Note:** This may take 2-5 minutes depending on your internet speed.

### Step 3: Start Development Server

Once installation is complete, start the development server:

```bash
npm run dev
```

You should see output like:
```
  VITE v5.4.1  ready in 500ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser

1. Open your web browser
2. Go to: `http://localhost:5173`
3. You should see the Sunrise Maintenance CRM application

## Available Commands

After installation, you can use these commands:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality

## Troubleshooting

### Common Issues:

1. **"npm not found"**
   - Install Node.js from nodejs.org
   - Restart terminal after installation

2. **Port 5173 already in use**
   - Stop other development servers
   - Or use: `npm run dev -- --port 3000`

3. **Installation fails**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

4. **TypeScript errors**
   - Ensure you're using Node.js 18+
   - Try: `npm run build` to check for errors

## What's Included

The CRM application includes:
- Complete customer management system
- Contact and deal tracking
- Dashboard with analytics
- Mobile-responsive design
- Modern UI with Tailwind CSS
- Full TypeScript support
- Database integration ready

## Next Steps

1. Explore the application features
2. Customize for your business needs
3. Set up database connection (Supabase)
4. Deploy to production when ready

## Support

If you encounter any issues:
- Check the TROUBLESHOOTING.md file
- Review the DEVELOPMENT_GUIDE.md
- Contact support at: support@sunrisemaintenance.com

---

**Ready to use in 3 simple steps:**
1. `npm install`
2. `npm run dev`
3. Open http://localhost:5173

That's it! Your CRM is now running locally.