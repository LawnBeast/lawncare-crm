import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, Download, Zap, Users, BarChart3 } from "lucide-react";

export const MobileApp = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Mobile CRM App</h2>
        <p className="text-muted-foreground">Take your CRM anywhere with our mobile application</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-500" />
              Mobile Features
            </CardTitle>
            <CardDescription>Full CRM functionality on mobile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-green-500" />
              <span className="text-sm">Manage contacts on the go</span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Real-time dashboard & analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Offline sync capabilities</span>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">iOS App</Badge>
              <Badge variant="outline">Android App</Badge>
              <Badge variant="outline">Progressive Web App</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Development</CardTitle>
            <CardDescription>Mobile app included in package</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✓ Included</h4>
              <p className="text-sm text-green-700">Mobile app development included with CRM purchase</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">• React Native development</p>
              <p className="text-sm">• App Store & Play Store deployment</p>
              <p className="text-sm">• Push notifications</p>
              <p className="text-sm">• Biometric authentication</p>
            </div>
            <Button className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Request Mobile App
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};