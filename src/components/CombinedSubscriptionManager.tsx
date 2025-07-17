import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Calendar, AlertCircle, Check, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Subscription {
  id: string;
  plan_name: string;
  amount: number;
  status: string;
  created_at: string;
}

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

export const CombinedSubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribeLoading, setSubscribeLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: Plan) => {
    setSubscribeLoading(plan.id);
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
      setSubscribeLoading(null);
    }
  };

  const cancelSubscription = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('id', id);

      if (error) throw error;
      fetchSubscriptions();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  const activeSubscription = subscriptions.find(sub => sub.status === 'active');

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Subscription Plans</h1>
        <p className="text-muted-foreground">Manage your subscription and choose the perfect plan</p>
      </div>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
          <TabsTrigger value="current">Current Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="space-y-6">
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
                    disabled={subscribeLoading === plan.id || (activeSubscription?.plan_name === plan.name)}
                  >
                    {subscribeLoading === plan.id ? 'Processing...' : 
                     activeSubscription?.plan_name === plan.name ? 'Current Plan' : 'Subscribe Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="current" className="space-y-6">
          {activeSubscription ? (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Current Subscription
                </CardTitle>
                <CardDescription>
                  Active since {new Date(activeSubscription.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{activeSubscription.plan_name}</div>
                  <div className="text-lg text-muted-foreground">${activeSubscription.amount}/month</div>
                </div>
                <Badge className="w-full justify-center bg-green-500">
                  Active
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Next billing: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => cancelSubscription(activeSubscription.id)}
                  className="w-full"
                >
                  Cancel Subscription
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="text-center p-6">
                <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Active Subscription</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have an active subscription. Choose a plan to get started.
                </p>
              </CardContent>
            </Card>
          )}

          {subscriptions.length > 0 && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Subscription History</h3>
              <div className="space-y-2">
                {subscriptions.map((sub) => (
                  <Card key={sub.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-medium">{sub.plan_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${sub.amount}/month</div>
                        <Badge variant={sub.status === 'active' ? 'default' : 'secondary'}>
                          {sub.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};