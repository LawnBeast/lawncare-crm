import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OwnershipInfo } from "./OwnershipInfo";
import { ResaleGuide } from "./ResaleGuide";
import { ContactSupport } from "./ContactSupport";
import { MobileApp } from "./MobileApp";
import { HostingPricing } from "./HostingPricing";
import { PaymentPlans } from "./PaymentPlans";
import { CRMDashboard } from "./CRMDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, MessageSquare, Play, Settings, Download, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const CRMOwnershipApp = () => {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4 border-b">
          <Button 
            variant="outline" 
            onClick={() => setShowDemo(false)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Ownership Info
          </Button>
          <h1 className="text-2xl font-bold">Sunrise Maintenance CRM - Live Demo</h1>
        </div>
        <CRMDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Sunrise Maintenance CRM</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Own • Customize • Resell • Profit
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Button onClick={() => setShowDemo(true)} size="lg">
              <Play className="h-4 w-4 mr-2" />
              View Live Demo
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/setup">
                <Settings className="h-4 w-4 mr-2" />
                Setup Guide
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/troubleshooting">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Troubleshooting
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Phone className="h-4 w-4 mr-2" />
              Call (555) 123-4567
            </Button>
          </div>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Your Questions Answered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="font-semibold text-green-600 mb-2">Cheapest Way to Own</h3>
                <p className="text-2xl font-bold">$2,997</p>
                <p className="text-sm text-muted-foreground">Self-hosted with full source code</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="font-semibold text-blue-600 mb-2">Ready to Use</h3>
                <p className="text-2xl font-bold">24-48 Hours</p>
                <p className="text-sm text-muted-foreground">After purchase completion</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="font-semibold text-purple-600 mb-2">Start Reselling</h3>
                <p className="text-2xl font-bold">Immediately</p>
                <p className="text-sm text-muted-foreground">No restrictions or delays</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="font-semibold text-orange-600 mb-2">Easy Setup</h3>
                <p className="text-2xl font-bold">5 Minutes</p>
                <p className="text-sm text-muted-foreground">With our setup guide</p>
                <Button size="sm" variant="outline" className="mt-2" asChild>
                  <Link to="/setup">
                    <Download className="h-3 w-3 mr-1" />
                    Setup Now
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="ownership" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="ownership">Ownership</TabsTrigger>
            <TabsTrigger value="resale">Resale Guide</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="mobile">Mobile App</TabsTrigger>
            <TabsTrigger value="hosting">Hosting</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ownership" className="mt-6">
            <OwnershipInfo />
          </TabsContent>
          
          <TabsContent value="resale" className="mt-6">
            <ResaleGuide />
          </TabsContent>
          
          <TabsContent value="contact" className="mt-6">
            <ContactSupport />
          </TabsContent>
          
          <TabsContent value="mobile" className="mt-6">
            <MobileApp />
          </TabsContent>
          
          <TabsContent value="hosting" className="mt-6">
            <HostingPricing />
          </TabsContent>
          
          <TabsContent value="payment" className="mt-6">
            <PaymentPlans />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};