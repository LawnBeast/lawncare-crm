import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Cloud, Star } from "lucide-react";

export const CloudHostedPricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$97",
      description: "Perfect for small businesses",
      features: [
        "Up to 1,000 contacts",
        "Basic CRM features",
        "Email support",
        "SSL security",
        "Daily backups"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$297",
      description: "Most popular for growing teams",
      features: [
        "Up to 10,000 contacts",
        "Advanced CRM features",
        "Priority support",
        "Custom integrations",
        "Advanced analytics",
        "Mobile app access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$597",
      description: "For large organizations",
      features: [
        "Unlimited contacts",
        "All CRM features",
        "24/7 phone support",
        "Custom development",
        "White-label options",
        "Dedicated account manager"
      ],
      popular: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Cloud Hosted Pricing</h2>
        <p className="text-muted-foreground">All plans include hosting, maintenance, and support</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                <Star className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-blue-500" />
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
              <div className="text-sm text-muted-foreground">Per month</div>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
              <Button 
                className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`} 
                size="lg"
                variant={plan.popular ? 'default' : 'outline'}
              >
                Start Free Trial
              </Button>
              <div className="text-xs text-center text-muted-foreground">
                14-day free trial • No credit card required
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};