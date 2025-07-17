import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Bot, Clock, MessageSquare, Calendar, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PhoneStats {
  totalCalls: number;
  appointmentsBooked: number;
  leadsCaptured: number;
  avgCallDuration: number;
}

export const AIPhoneDashboard = () => {
  const [stats, setStats] = useState<PhoneStats>({
    totalCalls: 0,
    appointmentsBooked: 0,
    leadsCaptured: 0,
    avgCallDuration: 0
  });
  const [recentCalls, setRecentCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhoneStats();
    fetchRecentCalls();
  }, []);

  const fetchPhoneStats = async () => {
    try {
      const { data: calls } = await supabase
        .from('phone_calls')
        .select('*');

      if (calls) {
        const totalCalls = calls.length;
        const appointmentsBooked = calls.filter(call => call.appointment_scheduled).length;
        const leadsCaptured = calls.filter(call => call.lead_captured).length;
        const avgCallDuration = calls.reduce((sum, call) => sum + (call.call_duration || 0), 0) / totalCalls || 0;

        setStats({
          totalCalls,
          appointmentsBooked,
          leadsCaptured,
          avgCallDuration: Math.round(avgCallDuration)
        });
      }
    } catch (error) {
      console.error('Error fetching phone stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentCalls = async () => {
    try {
      const { data: calls } = await supabase
        .from('phone_calls')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentCalls(calls || []);
    } catch (error) {
      console.error('Error fetching recent calls:', error);
    }
  };

  const statCards = [
    {
      title: "Total Calls Today",
      value: stats.totalCalls,
      icon: Phone,
      color: "text-blue-600"
    },
    {
      title: "Appointments Booked",
      value: stats.appointmentsBooked,
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Leads Captured",
      value: stats.leadsCaptured,
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Avg Call Duration",
      value: `${stats.avgCallDuration}s`,
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  if (loading) {
    return <div className="p-6">Loading AI Phone Service...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bot className="h-8 w-8 text-purple-500" />
            AI Phone Service
          </h1>
          <p className="text-muted-foreground">24/7 intelligent call handling for Sunrise Maintenance</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Phone className="w-4 h-4 mr-2" />
          View All Calls
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow border-purple-100">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.length > 0 ? (
                recentCalls.map((call, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{call.caller_name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{call.service_requested || 'General inquiry'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{call.caller_phone}</div>
                      {call.appointment_scheduled && (
                        <Badge className="bg-green-500">Appointment</Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent calls</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Snow Removal</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Lawn Care</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Landscaping</span>
                <Badge variant="secondary">5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">General Maintenance</span>
                <Badge variant="secondary">3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};