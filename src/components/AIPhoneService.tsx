import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Bot, Clock, MessageSquare, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface AIPhoneServiceProps {
  className?: string;
}

export const AIPhoneService = ({ className }: AIPhoneServiceProps) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

  const simulateCall = async () => {
    setIsSimulating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-phone-service', {
        body: { 
          caller_phone: '+1-555-0123',
          caller_name: 'John Smith',
          service_requested: 'Snow Removal'
        },
      });

      if (error) throw error;

      toast({
        title: "AI Call Simulation Complete",
        description: "Call logged and customer inquiry processed successfully.",
      });
    } catch (error) {
      console.error('Error simulating call:', error);
      toast({
        title: "Simulation Error",
        description: "Could not simulate AI phone call.",
        variant: "destructive",
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <Card className={`border-2 border-purple-200 hover:border-purple-300 transition-colors ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-purple-500" />
          AI Phone Service
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          Powered by AI
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-purple-600">$97</div>
        <div className="text-sm text-muted-foreground">Per month</div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-purple-500" />
            <span>24/7 AI phone answering</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MessageSquare className="h-4 w-4 text-purple-500" />
            <span>Smart call routing & transcription</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-purple-500" />
            <span>Appointment scheduling</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-purple-500" />
            <span>Lead capture & CRM integration</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-purple-500" />
            <span>Never miss a call again</span>
          </div>
        </div>
        
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700" 
          size="lg"
          onClick={simulateCall}
          disabled={isSimulating}
        >
          <Phone className="mr-2 h-4 w-4" />
          {isSimulating ? 'Simulating...' : 'Try AI Phone Demo'}
        </Button>
      </CardContent>
    </Card>
  );
};