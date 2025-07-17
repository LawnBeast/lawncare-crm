import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Server, Cloud, Shield } from "lucide-react";

export const HostingPricing = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Hosting & Pricing</h2>
        <p className="text-muted-foreground">Choose the perfect plan for your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-green-500" />
              Self-Hosted
            </CardTitle>
            <CardDescription>You own and control everything</CardDescription>
            <div className="text-3xl font-bold text-green-600">$2,997</div>
            <div className="text-sm text-muted-foreground">One-time payment</div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Complete source code</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Unlimited resale rights</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Mobile app included</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">White label ready</span>
            </div>
            <Badge variant="secondary">Most Popular</Badge>
            <Button className="w-full" size="lg">
              Get Started
            </Button>
            <div className="text-xs text-center text-muted-foreground">
              Payment plans available
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-blue-500" />
              Cloud Hosted
            </CardTitle>
            <CardDescription>We manage everything for you</CardDescription>
            <div className="text-3xl font-bold text-blue-600">$297</div>
            <div className="text-sm text-muted-foreground">Per month</div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">99.9% uptime guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Automatic backups</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">SSL & security</span>
            </div>
            <Button variant="outline" className="w-full" size="lg">
              Start Free Trial
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" />
              Enterprise
            </CardTitle>
            <CardDescription>Custom solution for large teams</CardDescription>
            <div className="text-3xl font-bold text-purple-600">Custom</div>
            <div className="text-sm text-muted-foreground">Contact for pricing</div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Custom development</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Dedicated support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Training included</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">SLA guarantee</span>
            </div>
            <Button variant="outline" className="w-full" size="lg">
              Contact Sales
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};