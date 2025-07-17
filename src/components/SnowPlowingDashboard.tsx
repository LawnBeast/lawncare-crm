import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Snowflake, MapPin, Clock, DollarSign, Plus, Search } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import SnowfallTracker from './SnowfallTracker';

interface SnowJob {
  id: string;
  client: string;
  address: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedTime: string;
  price: number;
  notes: string;
}

const SnowPlowingDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const snowJobs: SnowJob[] = [
    {
      id: '1',
      client: 'Michael Chen',
      address: '123 Oak Street',
      status: 'pending',
      priority: 'high',
      estimatedTime: '2 hours',
      price: 150,
      notes: 'Large driveway, needs salt'
    },
    {
      id: '2',
      client: 'Jennifer Wilson',
      address: '456 Pine Avenue',
      status: 'in-progress',
      priority: 'medium',
      estimatedTime: '1.5 hours',
      price: 120,
      notes: 'Regular customer'
    },
    {
      id: '3',
      client: 'David Thompson',
      address: '789 Maple Drive',
      status: 'completed',
      priority: 'low',
      estimatedTime: '1 hour',
      price: 100,
      notes: 'Small driveway'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJobs = snowJobs.filter(job => {
    const matchesSearch = job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: snowJobs.length,
    pending: snowJobs.filter(j => j.status === 'pending').length,
    inProgress: snowJobs.filter(j => j.status === 'in-progress').length,
    completed: snowJobs.filter(j => j.status === 'completed').length,
    revenue: snowJobs.filter(j => j.status === 'completed').reduce((sum, j) => sum + j.price, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Snowflake className="w-6 h-6 mr-2 text-blue-600" />
            Snow Plowing Dashboard
          </h2>
          <p className="text-gray-600">Manage snow removal jobs, weather, and measurements</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Snow Job
        </Button>
      </div>

      {/* Weather and Snowfall Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherWidget />
        <SnowfallTracker />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Snowflake className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-2 border-l-2 border-b-2 border-white transform rotate-45" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-green-600">${stats.revenue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{job.client}</CardTitle>
                <Badge className={getPriorityColor(job.priority)}>
                  {job.priority}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {job.address}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(job.status)}>
                    {job.status.replace('-', ' ')}
                  </Badge>
                  <span className="text-lg font-bold text-green-600">${job.price}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  Est. {job.estimatedTime}
                </div>
                <p className="text-sm text-gray-600">{job.notes}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Start Job
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Snowflake className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No snow plowing jobs found.</p>
        </div>
      )}
    </div>
  );
};

export default SnowPlowingDashboard;