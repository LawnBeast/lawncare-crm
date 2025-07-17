import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";

export const PricingPlans = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "per month",
      description: "Perfect for small businesses",
      features: [
        "Up to 500 contacts",
        "Basic CRM features",
        "Email support",
        "Mobile app access",
        "Basic reporting",
        "Weather tracking"
      ],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Professional",
      price: "$29.99",
      period: "per month",
      description: "For growing businesses",
      features: [
        "Up to 5,000 contacts",
        "Advanced CRM features",
        "Priority support",
        "Custom integrations",
        "Advanced reporting",
        "Team collaboration",
        "AI phone service",
        "Snowfall tracking"
      ],
      popular: true,
      color: "border-blue-500"
    },
    {
      name: "Business",
      price: "$49.99",
      period: "per month",
      description: "For established businesses",
      features: [
        "Unlimited contacts",
        "Full CRM suite",
        "24/7 phone support",
        "Custom development",
        "White-label solution",
        "Advanced security",
        "Dedicated account manager",
        "API access"
      ],
      popular: false,
      color: "border-purple-500"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Subscription Plans</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the perfect monthly subscription for your business. Start with Basic at just $9.99/month and upgrade as you grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="space-y-2">
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
              >
                {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Subscription Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Monthly Billing</h4>
            <p className="text-sm text-gray-600">Pay monthly with no long-term commitment. Cancel anytime.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Upgrade Anytime</h4>
            <p className="text-sm text-gray-600">Start with Basic and upgrade as your business grows.</p>
          </div>
        </div>
      </div>
    </div>
  );
};