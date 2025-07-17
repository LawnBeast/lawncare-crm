import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CloudHostedFeatures } from "./CloudHostedFeatures";
import { CloudHostedPricing } from "./CloudHostedPricing";
import { CRMDashboard } from "./CRMDashboard";
import { Cloud, Shield, Zap, HeadphonesIcon } from "lucide-react";

export const CloudHostedApp = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-500" variant="default">
            <Cloud className="h-4 w-4 mr-2" />
            Cloud Hosted Solution
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            We Manage Everything For You
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Focus on growing your business while we handle all the technical infrastructure, 
            maintenance, security, and support for your CRM system.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Auto-Scaling</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <HeadphonesIcon className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Free Trial
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="demo">Live Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Cloud Hosting?</CardTitle>
                <CardDescription>
                  Let our experts handle the technical complexity while you focus on what matters most.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">What We Handle:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Server management and maintenance</li>
                    <li>• Security updates and patches</li>
                    <li>• Database optimization</li>
                    <li>• Backup and disaster recovery</li>
                    <li>• Performance monitoring</li>
                    <li>• SSL certificates and security</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">What You Get:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• More time to focus on your business</li>
                    <li>• Guaranteed uptime and performance</li>
                    <li>• Expert technical support</li>
                    <li>• Automatic updates and improvements</li>
                    <li>• Scalability without complexity</li>
                    <li>• Peace of mind</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <CloudHostedFeatures />
          </TabsContent>

          <TabsContent value="pricing">
            <CloudHostedPricing />
          </TabsContent>

          <TabsContent value="demo">
            <CRMDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};