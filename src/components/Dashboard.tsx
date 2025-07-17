import React from 'react';
import DashboardStats from './DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Camera, ArrowRight, Leaf, Snowflake } from 'lucide-react';

const Dashboard: React.FC = () => {
  const recentActivities = [
    {
      id: 1,
      type: 'service',
      title: 'Lawn mowing completed for Sarah Johnson',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'snow',
      title: 'Snow plowing completed for Michael Chen',
      time: '3 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'photo',
      title: 'Before/after photos taken for Emily Rodriguez',
      time: '4 hours ago',
      status: 'pending'
    },
    {
      id: 4,
      type: 'estimate',
      title: 'Snow removal estimate sent to David Thompson',
      time: '1 day ago',
      status: 'completed'
    }
  ];

  const upcomingJobs = [
    {
      id: 1,
      client: 'John Smith',
      type: 'Lawn Mowing',
      time: '10:00 AM',
      date: 'Today'
    },
    {
      id: 2,
      client: 'Jennifer Wilson',
      type: 'Snow Plowing',
      time: '6:00 AM',
      date: 'Today'
    },
    {
      id: 3,
      client: 'Lisa Wong',
      type: 'Hedge Trimming',
      time: '2:30 PM',
      date: 'Today'
    },
    {
      id: 4,
      client: 'Robert Davis',
      type: 'Snow Removal',
      time: '7:00 AM',
      date: 'Tomorrow'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'service': return <Leaf className="w-4 h-4" />;
      case 'snow': return <Snowflake className="w-4 h-4" />;
      case 'photo': return <Camera className="w-4 h-4" />;
      case 'estimate': return <User className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-green-100 text-green-600';
      case 'snow': return 'bg-blue-100 text-blue-600';
      case 'photo': return 'bg-purple-100 text-purple-600';
      case 'estimate': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Jobs */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Upcoming Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      job.type.includes('Snow') ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {job.type.includes('Snow') ? <Snowflake className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{job.client}</p>
                      <p className="text-sm text-gray-500">{job.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{job.time}</p>
                    <p className="text-sm text-gray-500">{job.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Schedule
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;