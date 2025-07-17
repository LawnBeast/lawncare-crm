import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Snowflake, Plus, Calendar, Ruler } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SnowfallRecord {
  id: string;
  date: string;
  amount: number;
  location: string;
  notes: string;
  created_at: string;
}

const SnowfallTracker: React.FC = () => {
  const [records, setRecords] = useState<SnowfallRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    location: '',
    notes: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('snowfall_records')
        .select('*')
        .order('date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('snowfall_records')
        .insert([
          {
            date: newRecord.date,
            amount: parseFloat(newRecord.amount),
            location: newRecord.location,
            notes: newRecord.notes
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setRecords([data, ...records]);
      setNewRecord({ date: new Date().toISOString().split('T')[0], amount: '', location: '', notes: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error saving record:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const totalSnowfall = records.reduce((sum, record) => sum + record.amount, 0);
  const avgSnowfall = records.length > 0 ? totalSnowfall / records.length : 0;
  const lastWeekSnow = records.filter(r => {
    const recordDate = new Date(r.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return recordDate >= weekAgo;
  }).reduce((sum, record) => sum + record.amount, 0);

  const getAmountColor = (amount: number) => {
    if (amount >= 4) return 'bg-red-100 text-red-800';
    if (amount >= 2) return 'bg-orange-100 text-orange-800';
    if (amount > 0) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-600';
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Snowflake className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2">Loading snowfall data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Snowflake className="w-5 h-5 mr-2 text-blue-600" />
            Snowfall Tracker
          </CardTitle>
          <Button 
            onClick={() => setShowForm(!showForm)}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Record
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalSnowfall.toFixed(1)}"</div>
            <div className="text-sm text-gray-600">Total This Season</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{lastWeekSnow.toFixed(1)}"</div>
            <div className="text-sm text-gray-600">Last 7 Days</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{avgSnowfall.toFixed(1)}"</div>
            <div className="text-sm text-gray-600">Average</div>
          </div>
        </div>

        {/* Add Record Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount (inches)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={newRecord.amount}
                  onChange={(e) => setNewRecord({...newRecord, amount: e.target.value})}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Main Office, Warehouse"
                value={newRecord.location}
                onChange={(e) => setNewRecord({...newRecord, location: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                placeholder="Optional notes about conditions"
                value={newRecord.notes}
                onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Record'}
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        )}

        {/* Records List */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700">Recent Measurements</h4>
          {records.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Snowflake className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No snowfall records yet</p>
            </div>
          ) : (
            records.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium">{new Date(record.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-600">{record.location}</div>
                    {record.notes && <div className="text-xs text-gray-500">{record.notes}</div>}
                  </div>
                </div>
                <Badge className={getAmountColor(record.amount)}>
                  <Ruler className="w-3 h-3 mr-1" />
                  {record.amount}" snow
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SnowfallTracker;