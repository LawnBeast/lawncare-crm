import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, FileText, Calendar } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'client' | 'job' | 'general';
  reference_id?: string;
  reference_name?: string;
  created_at: string;
  updated_at: string;
}

export const NotesManager: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general' as 'client' | 'job' | 'general',
    reference_id: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadNotes();
    loadClients();
    loadJobs();
  }, []);

  const loadNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      console.error('Error loading notes:', error);
    }
  };

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      setClients(data || []);
    } catch (error: any) {
      console.error('Error loading clients:', error);
    }
  };

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('id, title')
        .order('title');
      
      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      console.error('Error loading jobs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let reference_name = '';
      if (formData.type === 'client' && formData.reference_id) {
        const client = clients.find(c => c.id === formData.reference_id);
        reference_name = client?.name || '';
      } else if (formData.type === 'job' && formData.reference_id) {
        const job = jobs.find(j => j.id === formData.reference_id);
        reference_name = job?.title || '';
      }

      const noteData = {
        title: formData.title,
        content: formData.content,
        type: formData.type,
        reference_id: formData.reference_id || null,
        reference_name: reference_name || null,
        user_id: user.id
      };

      if (editingNote) {
        const { error } = await supabase
          .from('notes')
          .update(noteData)
          .eq('id', editingNote.id);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Note updated successfully!' });
      } else {
        const { error } = await supabase
          .from('notes')
          .insert([noteData]);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Note created successfully!' });
      }

      resetForm();
      loadNotes();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      type: note.type,
      reference_id: note.reference_id || ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Success', description: 'Note deleted successfully!' });
      loadNotes();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setEditingNote(null);
    setFormData({ title: '', content: '', type: 'general', reference_id: '' });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'job': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <FileText className="w-6 h-6 mr-2" />
          Notes & Reminders
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingNote ? 'Edit Note' : 'Add New Note'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value, reference_id: ''})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Note</SelectItem>
                  <SelectItem value="client">Client Note</SelectItem>
                  <SelectItem value="job">Job Note</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.type === 'client' && (
              <div>
                <Label htmlFor="client">Client</Label>
                <Select value={formData.reference_id} onValueChange={(value) => setFormData({...formData, reference_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.type === 'job' && (
              <div>
                <Label htmlFor="job">Job</Label>
                <Select value={formData.reference_id} onValueChange={(value) => setFormData({...formData, reference_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={4}
                required
              />
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingNote ? 'Update Note' : 'Add Note'}
              </Button>
              {editingNote && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{note.title}</h3>
                  <Badge className={getTypeColor(note.type)}>
                    {note.type}
                  </Badge>
                  {note.reference_name && (
                    <Badge variant="outline">{note.reference_name}</Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(note)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(note.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(note.created_at).toLocaleDateString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
            </CardContent>
          </Card>
        ))}
        
        {notes.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No notes yet. Create your first note above.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};