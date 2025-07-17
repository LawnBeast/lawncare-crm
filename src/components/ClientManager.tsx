import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Mail, Phone, MapPin, Map } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ClientForm } from './ClientForm';
import { GoogleMapWithDB } from './GoogleMapWithDB';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

export const ClientManager: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showMap, setShowMap] = useState(false);
  const { toast } = useToast();

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setClients(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch clients',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Success', description: 'Client deleted successfully!' });
      fetchClients();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingClient(undefined);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchClients();
    setEditingClient(undefined);
  };

  const handleShowMap = (client: Client) => {
    setSelectedClient(client);
    setShowMap(true);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) {
    return <div className="p-6">Loading clients...</div>;
  }

  if (showMap && selectedClient) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Map - {selectedClient.name}</h1>
          <Button onClick={() => setShowMap(false)} variant="outline">
            Back to Clients
          </Button>
        </div>
        <GoogleMapWithDB 
          address={selectedClient.address}
          clientId={selectedClient.id}
          clientName={selectedClient.name}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{client.name}</span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShowMap(client)}
                    title="View on Map"
                  >
                    <Map className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(client)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteClient(client.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {client.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {client.phone}
                  </div>
                )}
                {client.address && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {client.address}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No clients yet</p>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Client
          </Button>
        </div>
      )}

      <ClientForm
        open={showForm}
        onOpenChange={setShowForm}
        client={editingClient}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};