import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Calculator, CheckCircle } from "lucide-react";

export const ResaleGuide = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">CRM Subscription Business Guide</h2>
        <p className="text-muted-foreground">Turn your CRM into a profitable subscription business with affordable monthly plans</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Target Markets
            </CardTitle>
            <CardDescription>Who to sell to</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Small Service Businesses</h4>
              <p className="text-sm text-muted-foreground">HVAC, plumbing, electrical, landscaping</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Startups & Freelancers</h4>
              <p className="text-sm text-muted-foreground">Solo entrepreneurs, small teams</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Local Businesses</h4>
              <p className="text-sm text-muted-foreground">Restaurants, retail, professional services</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-green-500" />
              Subscription Pricing
            </CardTitle>
            <CardDescription>Affordable monthly plans</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg bg-green-50">
              <h4 className="font-semibold text-green-600">Basic: $9.99/month</h4>
              <p className="text-sm">Up to 500 contacts, basic features</p>
            </div>
            <div className="p-3 border rounded-lg bg-blue-50">
              <h4 className="font-semibold text-blue-600">Professional: $29.99/month</h4>
              <p className="text-sm">Up to 5,000 contacts, advanced features</p>
            </div>
            <div className="p-3 border rounded-lg bg-purple-50">
              <h4 className="font-semibold text-purple-600">Business: $49.99/month</h4>
              <p className="text-sm">Unlimited contacts, full suite</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Revenue Projections
          </CardTitle>
          <CardDescription>Your potential monthly recurring revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">$299</div>
              <div className="text-sm text-muted-foreground">10 Basic subscribers</div>
              <div className="text-xs">$3,588 annual revenue</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$1,499</div>
              <div className="text-sm text-muted-foreground">50 Professional subscribers</div>
              <div className="text-xs">$17,988 annual revenue</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">$4,999</div>
              <div className="text-sm text-muted-foreground">100 Business subscribers</div>
              <div className="text-xs">$59,988 annual revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-500" />
              Sales Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-orange-100 text-orange-600">1</Badge>
              <div>
                <h4 className="font-semibold">Free Trial</h4>
                <p className="text-sm text-muted-foreground">Offer 14-day free trial</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-orange-100 text-orange-600">2</Badge>
              <div>
                <h4 className="font-semibold">Start Small</h4>
                <p className="text-sm text-muted-foreground">Begin with Basic plan</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-orange-100 text-orange-600">3</Badge>
              <div>
                <h4 className="font-semibold">Upsell Growth</h4>
                <p className="text-sm text-muted-foreground">Upgrade as they grow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-orange-100 text-orange-600">4</Badge>
              <div>
                <h4 className="font-semibold">Retain & Support</h4>
                <p className="text-sm text-muted-foreground">Keep subscribers happy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Success Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Low Barrier to Entry</h4>
              <p className="text-sm text-muted-foreground">$9.99 is easy to say yes to</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Focus on Value</h4>
              <p className="text-sm text-muted-foreground">Show ROI vs manual processes</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Easy Onboarding</h4>
              <p className="text-sm text-muted-foreground">Quick setup in minutes</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Customer Success</h4>
              <p className="text-sm text-muted-foreground">Help them succeed to reduce churn</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center">Ready to Start Your Subscription Business?</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg">With just 100 subscribers at $29.99/month, you'll earn <strong>$35,988 annually</strong></p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Launch Subscription Service
            </Button>
            <Button variant="outline" size="lg">
              Download Business Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};