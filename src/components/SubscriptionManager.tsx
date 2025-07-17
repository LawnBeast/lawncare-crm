import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Subscription {
  id: string;
  plan_name: string;
  amount: number;
  status: string;
  created_at: string;
}

export const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center p-4">Loading subscriptions...</div>;
  }

  const activeSubscription = subscriptions.find(sub => sub.status === 'active');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Subscription Management</h2>
        <p className="text-muted-foreground">Manage your current subscription</p>
      </div>

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
            <Button onClick={() => window.location.href = '/purchase'}>
              View Plans
            </Button>
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
    </div>
  );
};