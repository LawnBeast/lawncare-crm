import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Shield, Crown } from "lucide-react";

export const OneTimePurchase = () => {
  const handlePayment = () => {
    // Redirect to payment processor
    window.open('https://checkout.stripe.com/pay/cs_test_example', '_blank');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">One-Time Purchase</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Own the complete CRM system forever with full source code and resale rights.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto border-2 border-blue-500">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-2">
            <Badge className="bg-blue-500 text-white px-3 py-1">
              <Crown className="w-3 h-3 mr-1" />
              Complete Ownership
            </Badge>
          </div>
          <CardTitle className="text-2xl">CRM System - Full License</CardTitle>
          <div className="space-y-2">
            <div className="flex items-baseline justify-center space-x-1">
              <span className="text-4xl font-bold text-blue-600">$2,997</span>
              <span className="text-gray-600">one-time</span>
            </div>
            <p className="text-sm text-gray-600">No monthly fees, own it forever</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">What You Get:</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Complete source code</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">White-label rights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlimited resale rights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Installation guide</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Bonus Features:</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">90 days support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Free updates (1 year)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Documentation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Commercial license</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-800">30-Day Money Back Guarantee</h4>
            </div>
            <p className="text-sm text-green-700">
              If you're not completely satisfied, get a full refund within 30 days.
            </p>
          </div>
          
          <Button 
            onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Purchase Now - $2,997
          </Button>
          
          <div className="text-center text-sm text-gray-500">
            <p>Secure payment powered by Stripe</p>
            <p>All major credit cards accepted</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};