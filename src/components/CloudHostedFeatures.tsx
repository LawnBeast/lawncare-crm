import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Cloud, Shield, Zap, HeadphonesIcon, Database, Globe } from "lucide-react";

export const CloudHostedFeatures = () => {
  const features = [
    {
      icon: <Cloud className="h-6 w-6 text-blue-500" />,
      title: "99.9% Uptime Guarantee",
      description: "Enterprise-grade infrastructure with redundant systems"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "Enterprise Security",
      description: "SSL encryption, firewalls, and regular security audits"
    },
    {
      icon: <Database className="h-6 w-6 text-purple-500" />,
      title: "Automatic Backups",
      description: "Daily backups with point-in-time recovery options"
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Auto-Scaling",
      description: "Handles traffic spikes automatically without downtime"
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6 text-red-500" />,
      title: "24/7 Expert Support",
      description: "Dedicated support team available around the clock"
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-500" />,
      title: "Global CDN",
      description: "Fast loading times worldwide with edge locations"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className="mb-4" variant="secondary">Cloud Hosted Solution</Badge>
        <h2 className="text-3xl font-bold mb-2">We Manage Everything For You</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Focus on growing your business while we handle all the technical infrastructure, 
          maintenance, and security for your CRM system.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {feature.icon}
                <span className="text-lg">{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};