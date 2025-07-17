import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Building, DollarSign, Phone, MapPin } from "lucide-react";

interface GettingStartedProps {
  onNavigate: (section: string) => void;
}

export const GettingStarted = ({ onNavigate }: GettingStartedProps) => {
  const steps = [
    {
      title: "Add Your First Company",
      description: "Start by adding companies you work with",
      icon: Building,
      action: () => onNavigate("companies"),
      buttonText: "Add Company"
    },
    {
      title: "Add Contacts",
      description: "Add key contacts for your companies",
      icon: Users,
      action: () => onNavigate("contacts"),
      buttonText: "Add Contact"
    },
    {
      title: "Create Your First Deal",
      description: "Track potential business opportunities",
      icon: DollarSign,
      action: () => onNavigate("deals"),
      buttonText: "Create Deal"
    },
    {
      title: "Record Property Measurements",
      description: "Map and measure properties for accurate quotes",
      icon: MapPin,
      action: () => onNavigate("measurements"),
      buttonText: "Add Measurement"
    },
    {
      title: "Set Up AI Phone Service",
      description: "Configure automated phone handling",
      icon: Phone,
      action: () => onNavigate("ai-phone"),
      buttonText: "Setup AI Phone"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Sunrise Maintenance CRM</h1>
        <p className="text-gray-600">Get started by completing these essential setup steps</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                <Button onClick={step.action} className="w-full">
                  {step.buttonText}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Start with companies and contacts to build your customer base</li>
            <li>• Use the property mapping feature for accurate measurements</li>
            <li>• Set up AI phone service to handle calls automatically</li>
            <li>• Track deals to monitor your sales pipeline</li>
            <li>• Check pricing plans to optimize your service offerings</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};