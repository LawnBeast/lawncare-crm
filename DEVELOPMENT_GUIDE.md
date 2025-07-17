# Development Guide - Sunrise Maintenance CRM

## Getting Started

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **npm** (comes with Node.js)
- **Code Editor** (VS Code recommended)
- **Git** (optional, for version control)

### Initial Setup

1. **Verify Node.js installation**
   ```bash
   node --version  # Should show v18.x.x or higher
   npm --version   # Should show 8.x.x or higher
   ```

2. **Navigate to project folder**
   ```bash
   cd path/to/project
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   *This installs 50+ packages including React, TypeScript, Tailwind CSS, etc.*

4. **Start development server**
   ```bash
   npm run dev
   ```
   *Server starts at http://localhost:5173*

## Development Workflow

### Available Scripts

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run dev` | Start development server | Daily development |
| `npm run build` | Build for production | Before deployment |
| `npm run preview` | Preview production build | Test production build |
| `npm run lint` | Check code quality | Before committing |

### Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── CRMApp.tsx    # Main CRM application
│   ├── Dashboard.tsx # Analytics dashboard
│   └── ...           # Feature components
├── pages/
│   ├── Index.tsx     # Homepage
│   ├── Setup.tsx     # Setup wizard
│   └── ...           # Route pages
├── lib/
│   ├── supabase.ts   # Database client
│   └── utils.ts      # Utility functions
├── hooks/            # Custom React hooks
├── contexts/         # React contexts
└── main.tsx          # App entry point
```

## Common Development Tasks

### Adding New Components

1. Create component file in `src/components/`
2. Use TypeScript interfaces for props
3. Follow naming convention: `PascalCase.tsx`
4. Export as default

### Styling Guidelines

- Use **Tailwind CSS** classes
- Follow **mobile-first** approach
- Use **Radix UI** components for complex interactions
- Maintain **consistent spacing** (4, 8, 16, 24px)

### Database Integration

- Use **Supabase** client from `src/lib/supabase.ts`
- Follow **TypeScript** types for database operations
- Handle **loading states** and **errors** properly

## Troubleshooting Development Issues

### "npm not found"
**Solution:** Install Node.js from nodejs.org

### "Port in use"
**Solution:** Use different port
```bash
npm run dev -- --port 3000
```

### "Install fails"
**Solution:** Clear cache and reinstall
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### "Blank page"
**Solution:** Check browser console and terminal for errors

### TypeScript Errors
**Solution:** Check imports and type definitions
```bash
npm run lint
```

### Build Errors
**Solution:** Test production build
```bash
npm run build
```

## Best Practices

### Code Quality
- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Write **descriptive** component names
- Keep components **small** and **focused**

### Performance
- Use **React.memo** for expensive components
- Implement **lazy loading** for routes
- Optimize **images** and **assets**
- Monitor **bundle size**

### Testing
- Test in **multiple browsers**
- Check **mobile responsiveness**
- Verify **accessibility**
- Test **error scenarios**

## Deployment

### Production Build
```bash
npm run build
```
Files will be in `dist/` folder

### Preview Production
```bash
npm run preview
```
Test production build locally

## Getting Help

1. Check **browser console** (F12)
2. Review **terminal output**
3. Verify **file structure**
4. Try **fresh installation**
5. Check **documentation files**

---

**Happy coding!** Your development environment is ready.