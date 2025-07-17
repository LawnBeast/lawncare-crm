# Troubleshooting Guide

## Common Issues & Solutions

### 1. Installation Problems

**Error: `npm install` fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: Node version too old**
- Install Node.js 18+ from https://nodejs.org/
- Verify: `node --version`

### 2. Development Server Issues

**Error: Port 5173 already in use**
- Vite will automatically use next available port
- Or specify port: `npm run dev -- --port 3000`

**Error: `npm run dev` fails**
```bash
# Check if dependencies installed
npm install

# Try alternative start
npx vite
```

### 3. Build Errors

**TypeScript errors**
- Check `tsconfig.json` configuration
- Ensure all imports are correct
- Run: `npm run lint`

**Missing dependencies**
```bash
# Reinstall specific package
npm install @supabase/supabase-js
```

### 4. Browser Issues

**Blank page**
- Check browser console for errors
- Clear browser cache
- Try incognito/private mode

**Styles not loading**
- Ensure Tailwind CSS is configured
- Check `tailwind.config.ts`

### 5. Database Connection

**Supabase errors**
- Check `src/lib/supabase.ts` configuration
- Verify environment variables
- Ensure database tables exist

### 6. Performance Issues

**Slow loading**
- Run production build: `npm run build`
- Use `npm run preview` to test

### 7. Getting Help

1. Check browser console (F12)
2. Look at terminal output
3. Verify all files exist
4. Try fresh install

### 8. Reset Everything
```bash
# Nuclear option - fresh start
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```