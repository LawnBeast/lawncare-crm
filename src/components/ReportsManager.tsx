import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Briefcase, FileText, DollarSign } from 'lucide-react';

interface Stats {
  totalClients: number;
  totalJobs: number;
  totalNotes: number;
  jobsByStatus: { [key: string]: number };
  recentActivity: any[];
}

export const ReportsManager: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    totalJobs: 0,
    totalNotes: 0,
    jobsByStatus: {},
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get total clients
      const { count: clientCount } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get total jobs
      const { count: jobCount } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get total notes
      const { count: noteCount } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get jobs by status
      const { data: jobs } = await supabase
        .from('jobs')
        .select('status')
        .eq('user_id', user.id);

      const jobsByStatus = jobs?.reduce((acc: any, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
      }, {}) || {};

      // Get recent activity (last 10 jobs)
      const { data: recentJobs } = await supabase
        .from('jobs')
        .select('id, title, status, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      setStats({
        totalClients: clientCount || 0,
        totalJobs: jobCount || 0,
        totalNotes: noteCount || 0,
        jobsByStatus,
        recentActivity: recentJobs || []
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          Reports & Analytics
        </h2>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Job Analytics</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClients}</div>
                <p className="text-xs text-muted-foreground">Active clients in system</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalJobs}</div>
                <p className="text-xs text-muted-foreground">Jobs created</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalNotes}</div>
                <p className="text-xs text-muted-foreground">Notes and reminders</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Jobs by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(stats.jobsByStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(status)}>
                        {status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
                {Object.keys(stats.jobsByStatus).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No jobs found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((job) => (
                  <div key={job.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(job.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                ))}
                {stats.recentActivity.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};