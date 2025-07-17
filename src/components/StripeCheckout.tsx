import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StripePayment } from './StripePayment';

interface StripeCheckoutProps {
  planName: string;
  amount: number;
  buttonText: string;
  variant?: 'default' | 'outline';
}

export const StripeCheckout = ({ planName, amount, buttonText, variant = 'default' }: StripeCheckoutProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    // Could add success notification here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className="w-full" size="lg">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe to {planName}</DialogTitle>
        </DialogHeader>
        <StripePayment 
          planName={planName}
          amount={amount}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};