import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface InvoiceFormProps {
  onSuccess?: () => void;
  clients: any[];
}

export const InvoiceForm = ({ onSuccess, clients }: InvoiceFormProps) => {
  const [formData, setFormData] = useState({
    client_id: '',
    invoice_number: '',
    amount: '',
    due_date: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('invoices')
        .insert([{
          ...formData,
          user_id: user.id,
          amount: parseFloat(formData.amount)
        }]);

      if (error) throw error;

      toast({ title: 'Invoice created successfully!' });
      setFormData({ client_id: '', invoice_number: '', amount: '', due_date: '', status: 'pending' });
      onSuccess?.();
    } catch (error: any) {
      toast({ title: 'Error creating invoice', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="client">Client</Label>
            <Select value={formData.client_id} onValueChange={(value) => setFormData({...formData, client_id: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="invoice_number">Invoice Number</Label>
            <Input
              id="invoice_number"
              value={formData.invoice_number}
              onChange={(e) => setFormData({...formData, invoice_number: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="due_date">Due Date</Label>
            <Input
              id="due_date"
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Invoice'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};