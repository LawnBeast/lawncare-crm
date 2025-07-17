import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, DollarSign, Repeat } from "lucide-react";
import { StripeCheckout } from "./StripeCheckout";

export const PaymentPlans = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Subscription Payment Plans</h2>
        <p className="text-muted-foreground">Choose your monthly subscription plan</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Basic Plan
            </CardTitle>
            <CardDescription>Perfect for small businesses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$9.99</div>
              <div className="text-sm text-muted-foreground">Per month</div>
            </div>
            <Badge variant="secondary" className="w-full justify-center">
              Most Affordable
            </Badge>
            <ul className="space-y-2 text-sm">
              <li>• Up to 500 contacts</li>
              <li>• Basic CRM features</li>
              <li>• Email support</li>
              <li>• Mobile app access</li>
              <li>• Weather tracking</li>
            </ul>
            <StripeCheckout 
              planName="Basic Plan"
              amount={9.99}
              buttonText="Start Basic Plan"
            />
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Professional Plan
            </CardTitle>
            <CardDescription>For growing businesses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$29.99</div>
              <div className="text-sm text-muted-foreground">Per month</div>
            </div>
            <Badge className="w-full justify-center bg-blue-500">
              Most Popular
            </Badge>
            <ul className="space-y-2 text-sm">
              <li>• Up to 5,000 contacts</li>
              <li>• Advanced CRM features</li>
              <li>• Priority support</li>
              <li>• AI phone service</li>
              <li>• Team collaboration</li>
            </ul>
            <StripeCheckout 
              planName="Professional Plan"
              amount={29.99}
              buttonText="Start Professional Plan"
              variant="outline"
            />
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-500" />
              Business Plan
            </CardTitle>
            <CardDescription>For established businesses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">$49.99</div>
              <div className="text-sm text-muted-foreground">Per month</div>
            </div>
            <Badge variant="secondary" className="w-full justify-center">
              Full Features
            </Badge>
            <ul className="space-y-2 text-sm">
              <li>• Unlimited contacts</li>
              <li>• Full CRM suite</li>
              <li>• 24/7 phone support</li>
              <li>• White-label solution</li>
              <li>• API access</li>
            </ul>
            <StripeCheckout 
              planName="Business Plan"
              amount={49.99}
              buttonText="Start Business Plan"
              variant="outline"
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Repeat className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-blue-800">
            <strong>Monthly Billing:</strong> Pay monthly with no long-term commitment. Cancel anytime.
          </p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-green-800">
            <strong>Upgrade Anytime:</strong> Start with Basic and upgrade as your business grows.
          </p>
        </div>
      </div>
      
      <div className="text-center p-4 bg-gray-50 rounded-lg border">
        <p className="text-sm text-gray-700">
          <strong>Need help choosing?</strong> Contact us for a free consultation to find the perfect plan for your business.
        </p>
      </div>
    </div>
  );
};