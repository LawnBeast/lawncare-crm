import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Globe, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function PreviewLink() {
  const handlePreview = () => {
    // In a real deployment, this would be your actual preview URL
    window.open('https://your-crm-preview.vercel.app', '_blank');
  };

  const handleLocalPreview = () => {
    // For local development
    window.open('http://localhost:5173', '_blank');
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Preview Your CRM
        </CardTitle>
        <CardDescription>
          See your CRM application in action before making a purchase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <Link to="/">
            <Button className="w-full" size="lg">
              <Play className="mr-2 h-4 w-4" />
              Interactive Demo
            </Button>
          </Link>
          
          <Button 
            onClick={handlePreview} 
            variant="outline"
            className="w-full" 
            size="lg"
          >
            <Globe className="mr-2 h-4 w-4" />
            Live Preview Link
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            onClick={handleLocalPreview} 
            variant="outline" 
            className="w-full" 
            size="lg"
          >
            <Eye className="mr-2 h-4 w-4" />
            Local Development
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>To run locally:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Run <code className="bg-muted px-1 rounded">npm run dev</code></li>
            <li>Open <code className="bg-muted px-1 rounded">http://localhost:5173</code></li>
            <li>Explore all features and functionality</li>
          </ol>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-blue-900">Preview Features:</p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1">
            <li>• Full CRM Dashboard</li>
            <li>• Contact & Deal Management</li>
            <li>• AI Phone Service Demo</li>
            <li>• Mobile-Responsive Design</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}