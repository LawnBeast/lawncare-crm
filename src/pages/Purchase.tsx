import { PricingPlans } from "@/components/PricingPlans";
import { PaymentPlans } from "@/components/PaymentPlans";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Purchase = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pricing">Subscription Plans</TabsTrigger>
            <TabsTrigger value="payment">Payment Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pricing" className="mt-6">
            <PricingPlans />
          </TabsContent>
          
          <TabsContent value="payment" className="mt-6">
            <PaymentPlans />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Purchase;