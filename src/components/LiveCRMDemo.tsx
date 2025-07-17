import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, X } from "lucide-react";
import { CRMApp } from "./CRMApp";

export const LiveCRMDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Live Demo</Badge>
            <span className="text-sm text-muted-foreground">Full CRM System Preview</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-[calc(100vh-65px)]">
          <CRMApp />
        </div>
      </div>
    );
  }

  return (
    <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Eye className="h-6 w-6 text-purple-500" />
          Live Demo
        </CardTitle>
        <CardDescription>
          See the complete CRM system in action
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm">
          <li>• Interactive dashboard with real data</li>
          <li>• Contact & company management</li>
          <li>• Deal pipeline tracking</li>
          <li>• Measurement tools with photos</li>
          <li>• Full feature exploration</li>
        </ul>
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700" 
          size="lg"
          onClick={() => setIsOpen(true)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Launch Live Demo
        </Button>
      </CardContent>
    </Card>
  );
};
