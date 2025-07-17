import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    description: 'Perfect for small businesses',
    features: [
      'Up to 500 contacts',
      'Basic CRM features',
      'Email support',
      'Mobile app access',
      'Basic reporting',
      'Weather tracking'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29.99,
    description: 'For growing businesses',
    popular: true,
    features: [
      'Up to 5,000 contacts',
      'Advanced CRM features',
      'Priority support',
      'Custom integrations',
      'Advanced reporting',
      'Team collaboration',
      'AI phone service',
      'Snowfall tracking'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    price: 49.99,
    description: 'For established businesses',
    features: [
      'Unlimited contacts',
      'Full CRM suite',
      '24/7 phone support',
      'Custom development',
      'White-label solution',
      'Advanced security',
      'Dedicated account manager',
      'API access'
    ]
  }
];

export const SubscriptionPlans = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (plan: Plan) => {
    setLoading(plan.id);
    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          planId: plan.id,
          planName: plan.name,
          amount: plan.price
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error processing subscription:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Subscription Plans</h2>
        <p className="text-muted-foreground">Choose the perfect plan for your business</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => handleSubscribe(plan)}
                disabled={loading === plan.id}
              >
                {loading === plan.id ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};