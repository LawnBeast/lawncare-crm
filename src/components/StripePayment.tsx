import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface StripePaymentProps {
  planName: string;
  amount: number;
  onSuccess?: () => void;
}

export const StripePayment = ({ planName, amount, onSuccess }: StripePaymentProps) => {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Call Stripe payment processing function
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          planName,
          amount,
          cardNumber,
          expiryDate,
          cvv,
          name,
          email
        }
      });

      if (error) throw error;
      
      setSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground mb-4">
            Your {planName} subscription is now active.
          </p>
          <Button onClick={() => window.location.reload()}>Continue</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
        <CardDescription>
          {planName} - ${amount}/month
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="card">Card Number</Label>
          <Input
            id="card"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              maxLength={3}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" />
          Your payment information is secure and encrypted
        </div>
        
        <Button 
          onClick={handlePayment} 
          disabled={loading || !cardNumber || !expiryDate || !cvv || !name || !email}
          className="w-full"
          size="lg"
        >
          {loading ? 'Processing...' : `Pay $${amount}/month`}
        </Button>
      </CardContent>
    </Card>
  );
};