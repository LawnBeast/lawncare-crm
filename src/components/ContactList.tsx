import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Search, Phone, Mail, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AddItemDialog } from "./AddItemDialog";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  company_id: string;
  companies?: {
    name: string;
  };
}

export const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      // Load from localStorage or use demo data
      const localData = localStorage.getItem('contacts');
      if (localData) {
        setContacts(JSON.parse(localData));
      } else {
        // Use demo data
        const demoData = [
          {
            id: '1',
            name: 'John Smith',
            email: 'john@greenlawn.com',
            phone: '(555) 123-4567',
            position: 'Property Manager',
            status: 'active',
            company_id: '1',
            companies: { name: 'Green Lawn Services' }
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah@citypm.com',
            phone: '(555) 987-6543',
            position: 'Operations Director',
            status: 'lead',
            company_id: '2',
            companies: { name: 'City Property Management' }
          }
        ];
        setContacts(demoData);
        localStorage.setItem('contacts', JSON.stringify(demoData));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.position && contact.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (contact.companies?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'lead': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="p-6">Loading contacts...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Demo Mode
        </Badge>
        <AddItemDialog type="contact" onSuccess={fetchContacts} />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {contact.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{contact.position || 'No position'}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(contact.status || 'active')}>
                  {contact.status || 'active'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {contact.companies && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{contact.companies.name}</span>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
              )}
              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first contact.</p>
          <AddItemDialog type="contact" onSuccess={fetchContacts} />
        </div>
      )}
    </div>
  );
};