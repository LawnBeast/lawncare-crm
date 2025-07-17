import { useState, useEffect } from 'react';
import { InvoiceForm } from './InvoiceForm';
import { InvoiceList } from './InvoiceList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';

export const InvoiceManager = () => {
  const [clients, setClients] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('clients')
        .select('id, name')
        .eq('user_id', user.id)
        .order('name');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleInvoiceCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Invoice Management</h2>
        <p className="text-gray-600">Create and manage invoices for your clients</p>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">All Invoices</TabsTrigger>
          <TabsTrigger value="create">Create Invoice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <InvoiceList key={refreshKey} />
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <InvoiceForm 
            clients={clients} 
            onSuccess={handleInvoiceCreated}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};