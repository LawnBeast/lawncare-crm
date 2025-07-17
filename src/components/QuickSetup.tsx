import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Terminal, Play, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

export const QuickSetup = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  const CommandBox = ({ cmd, desc }: { cmd: string; desc: string }) => (
    <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm relative">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-400 text-xs">{desc}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copyCommand(cmd)}
          className="text-gray-400 hover:text-white h-5 w-5 p-0"
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-blue-400">$</span>
        <span>{cmd}</span>
      </div>
      {copied === cmd && (
        <div className="absolute top-1 right-1 bg-green-600 text-white px-2 py-1 rounded text-xs">
          Copied!
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Quick Setup Guide</h1>
        <p className="text-muted-foreground mb-4">
          Get your CRM running in 3 simple steps
        </p>
        <Badge variant="secondary">Takes 5 minutes</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardHeader>
            <Download className="h-12 w-12 mx-auto mb-2 text-blue-600" />
            <CardTitle>1. Install Node.js</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Download Node.js 18+ from official website
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Download Node.js
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Terminal className="h-12 w-12 mx-auto mb-2 text-green-600" />
            <CardTitle>2. Install Dependencies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Run this command in your project folder
            </p>
            <CommandBox cmd="npm install" desc="Install all packages" />
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Play className="h-12 w-12 mx-auto mb-2 text-purple-600" />
            <CardTitle>3. Start Server</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Launch the development server
            </p>
            <CommandBox cmd="npm run dev" desc="Start development server" />
          </CardContent>
        </Card>
      </div>

      <Alert className="mb-6">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Success!</strong> Open <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:5173</code> in your browser to see your CRM.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Step 1: Prerequisites</h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Download Node.js from nodejs.org</li>
                <li>• Choose LTS version (18.x or higher)</li>
                <li>• Install and restart your computer</li>
                <li>• Verify: <code className="bg-gray-100 px-2 py-1 rounded">node --version</code></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Step 2: Open Terminal</h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Windows: Press Win + R, type "cmd", press Enter</li>
                <li>• Mac: Press Cmd + Space, type "terminal", press Enter</li>
                <li>• Linux: Press Ctrl + Alt + T</li>
                <li>• Navigate to project folder: <code className="bg-gray-100 px-2 py-1 rounded">cd path/to/project</code></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Step 3: Install & Run</h4>
              <div className="space-y-2">
                <CommandBox cmd="npm install" desc="Install dependencies (takes 2-5 minutes)" />
                <CommandBox cmd="npm run dev" desc="Start development server" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Common Issues</h4>
              <ul className="text-sm space-y-1">
                <li>• "npm not found" → Install Node.js</li>
                <li>• "Port in use" → Use different port</li>
                <li>• Install fails → Clear cache</li>
                <li>• Blank page → Check terminal errors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Quick Fixes</h4>
              <div className="space-y-1">
                <CommandBox cmd="npm run dev -- --port 3000" desc="Use different port" />
                <CommandBox cmd="npm cache clean --force" desc="Clear npm cache" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};