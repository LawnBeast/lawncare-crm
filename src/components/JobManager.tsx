import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Calendar, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { JobForm } from './JobForm';

interface Job {
  id: string;
  title: string;
  description: string;
  status: string;
  scheduled_date: string;
  client_id: string;
  clients: { name: string };
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const JobManager: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  const { toast } = useToast();

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          clients(name)
        `)
        .order('scheduled_date', { ascending: true });
      
      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch jobs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Success', description: 'Job deleted successfully!' });
      fetchJobs();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingJob(undefined);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchJobs();
    setEditingJob(undefined);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <div className="p-6">Loading jobs...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Job
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{job.title}</span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(job)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteJob(job.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge className={statusColors[job.status as keyof typeof statusColors]}>
                  {job.status.replace('_', ' ')}
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {job.clients?.name || 'No client'}
                </div>
                {job.scheduled_date && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(job.scheduled_date).toLocaleDateString()}
                  </div>
                )}
                {job.description && (
                  <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No jobs yet</p>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Job
          </Button>
        </div>
      )}

      <JobForm
        open={showForm}
        onOpenChange={setShowForm}
        job={editingJob}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};