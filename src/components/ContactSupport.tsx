import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageCircle, Calendar, Clock } from "lucide-react";
import { useState } from "react";

export const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Get Your Questions Answered</h2>
        <p className="text-muted-foreground">Speak with our CRM ownership specialists</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-500" />
              Schedule a Call
            </CardTitle>
            <CardDescription>Speak directly with our team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-600">Available Now</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Monday - Friday: 9 AM - 6 PM EST
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Phone className="h-4 w-4 mr-2" />
                Call (555) 123-4567
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-600">Book a Demo</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                30-minute personalized demo
              </p>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              Send a Message
            </CardTitle>
            <CardDescription>We'll respond within 2 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <Textarea
                placeholder="Your questions about CRM ownership, pricing, or resale..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                required
              />
              <Button type="submit" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-center">Common Questions We Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Ownership & Licensing</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complete source code access</li>
                <li>• White labeling permissions</li>
                <li>• Unlimited resale rights</li>
                <li>• Modification restrictions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Business & Profit</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Resale pricing strategies</li>
                <li>• Target market identification</li>
                <li>• Revenue projections</li>
                <li>• Competition analysis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};