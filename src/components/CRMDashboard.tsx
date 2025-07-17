import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, DollarSign, TrendingUp, Plus, Phone, Bot, Map } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { GoogleMapWithDB } from "./GoogleMapWithDB";

interface DashboardStats {
  totalCompanies: number;
  totalContacts: number;
  totalDeals: number;
  totalValue: number;
}

export const CRMDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCompanies: 0,
    totalContacts: 0,
    totalDeals: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [companies, contacts, deals] = await Promise.all([
        supabase.from('companies').select('*', { count: 'exact' }),
        supabase.from('contacts').select('*', { count: 'exact' }),
        supabase.from('deals').select('value')
      ]);

      const totalValue = deals.data?.reduce((sum, deal) => sum + (deal.value || 0), 0) || 0;

      setStats({
        totalCompanies: companies.count || 0,
        totalContacts: contacts.count || 0,
        totalDeals: deals.data?.length || 0,
        totalValue
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Companies",
      value: stats.totalCompanies,
      icon: Building2,
      color: "text-blue-600"
    },
    {
      title: "Contacts",
      value: stats.totalContacts,
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Active Deals",
      value: stats.totalDeals,
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Total Value",
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-yellow-600"
    }
  ];

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sunrise Maintenance Dashboard</h1>
          <p className="text-muted-foreground">Manage your maintenance business efficiently</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={showMap ? "default" : "outline"}
            onClick={() => setShowMap(!showMap)}
          >
            <Map className="w-4 h-4 mr-2" />
            {showMap ? 'Hide Map' : 'Show Map'}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showMap && (
        <GoogleMapWithDB 
          address="New York, NY"
          clientName="Sunrise Maintenance"
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-500" />
              AI Phone Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Calls Today</span>
                <Badge className="bg-purple-500">24</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Appointments Booked</span>
                <Badge className="bg-green-500">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Leads Captured</span>
                <Badge className="bg-blue-500">12</Badge>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                View Call Log
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">New maintenance request: Lawn Care</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Snow removal quote: $2,500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">AI answered call: Driveway service</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">New Inquiries</span>
                <Badge variant="secondary">15</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Quotes Sent</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Scheduled</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed</span>
                <Badge className="bg-green-500">6</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};