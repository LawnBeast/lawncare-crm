import PreviewLink from "@/components/PreviewLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Preview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">CRM Preview</h1>
          <p className="text-lg text-muted-foreground">
            Experience the full functionality of your CRM system before purchasing.
          </p>
        </div>

        <div className="space-y-8">
          <PreviewLink />
          
          <Card>
            <CardHeader>
              <CardTitle>What You'll See in the Preview</CardTitle>
              <CardDescription>
                Full access to all CRM features and functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Core Features</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Complete CRM Dashboard</li>
                    <li>• Contact Management</li>
                    <li>• Deal Tracking</li>
                    <li>• Company Management</li>
                    <li>• Snow Plowing Dashboard</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Advanced Features</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• AI Phone Service Integration</li>
                    <li>• Weather Tracking</li>
                    <li>• Mobile-Responsive Design</li>
                    <li>• Real-time Analytics</li>
                    <li>• Measurement Tools</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Preview;