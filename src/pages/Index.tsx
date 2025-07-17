import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Server, ArrowRight, CreditCard, Repeat, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { LiveCRMDemo } from "@/components/LiveCRMDemo";
import { AIPhoneService } from "@/components/AIPhoneService";
import PreviewLink from "@/components/PreviewLink";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            Sunrise Maintenance Solutions
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sunrise Maintenance CRM
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete business management system for Sunrise Maintenance. 
            CRM, AI phone service, and mobile solutions all in one platform.
          </p>
        </div>

        {/* Preview Section */}
        <div className="mb-16">
          <PreviewLink />
        </div>

        {/* Live Demo + Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <LiveCRMDemo />
          <AIPhoneService />
          
          <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Repeat className="h-6 w-6 text-green-500" />
                Monthly Subscription
              </CardTitle>
              <CardDescription>
                Affordable monthly plans
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-green-600">$9.99</div>
              <div className="text-sm text-muted-foreground">Starting at / month</div>
              <ul className="space-y-2 text-sm">
                <li>• Basic: $9.99/month</li>
                <li>• Professional: $29.99/month</li>
                <li>• Business: $49.99/month</li>
                <li>• Cancel anytime</li>
              </ul>
              <Link to="/purchase">
                <Button className="w-full" size="lg">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscribe Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Cloud className="h-6 w-6 text-blue-500" />
                Cloud Hosted
              </CardTitle>
              <CardDescription>
                We manage everything for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-blue-600">$297</div>
              <div className="text-sm text-muted-foreground">Per month</div>
              <ul className="space-y-2 text-sm">
                <li>• 99.9% uptime guarantee</li>
                <li>• Automatic backups</li>
                <li>• 24/7 expert support</li>
                <li>• Auto-scaling</li>
              </ul>
              <Link to="/cloud-hosted">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Explore Cloud
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;