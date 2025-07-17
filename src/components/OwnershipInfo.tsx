import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Server, Smartphone, Crown, DollarSign, Clock, Zap } from "lucide-react";

export const OwnershipInfo = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Sunrise Maintenance CRM - Ownership Guide</h2>
        <p className="text-muted-foreground">Complete ownership, immediate deployment, and profitable resale opportunities</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Zap className="h-5 w-5" />
              Cheapest Option
            </CardTitle>
            <CardDescription>Self-hosted deployment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold text-green-600">$2,997</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Full Source Code</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Self-Host Setup</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Resale Rights</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ White Label</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Deploy on your own servers (AWS, DigitalOcean, etc.)</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Server className="h-5 w-5" />
              Managed Hosting
            </CardTitle>
            <CardDescription>We handle the technical setup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold text-blue-600">$4,997</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Everything Above</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Managed Hosting</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ 99.9% Uptime</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Technical Support</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Fully managed cloud hosting with support</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Crown className="h-5 w-5" />
              Enterprise Package
            </CardTitle>
            <CardDescription>Complete business solution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold text-purple-600">$7,997</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Everything Above</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Mobile Apps</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Custom Branding</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">✓ Training & Support</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">iOS & Android apps + complete setup</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg bg-green-50">
              <h4 className="font-semibold text-green-600">Use for Your Company</h4>
              <p className="text-sm">Ready in 24-48 hours after purchase</p>
            </div>
            <div className="p-3 border rounded-lg bg-blue-50">
              <h4 className="font-semibold text-blue-600">Start Reselling</h4>
              <p className="text-sm">Immediately after setup completion</p>
            </div>
            <div className="p-3 border rounded-lg bg-purple-50">
              <h4 className="font-semibold text-purple-600">Full Customization</h4>
              <p className="text-sm">Source code access allows unlimited modifications</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              Profit Potential
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Resale Price: $500-2000/month per client</h4>
              <p className="text-sm text-muted-foreground">Typical SaaS pricing for CRM systems</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Break Even: 2-6 clients</h4>
              <p className="text-sm text-muted-foreground">Recover investment quickly</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Unlimited Resale Rights</h4>
              <p className="text-sm text-muted-foreground">No restrictions on client count</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-center">Recommended Path for Sunrise Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg">Start with the <strong>Self-Hosted Option ($2,997)</strong> - the most cost-effective way to own and resell</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Started - $2,997
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};