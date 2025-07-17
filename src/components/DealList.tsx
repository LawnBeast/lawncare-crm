import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Search, Building2, User, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { AddItemDialog } from "./AddItemDialog";

interface Deal {
  id: string;
  title: string;
  amount: number;
  status: string;
  probability: number;
  expected_close_date: string;
  companies?: {
    name: string;
  };
  contacts?: {
    first_name: string;
    last_name: string;
  };
}

export const DealList = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      // Load from localStorage or use demo data
      const localData = localStorage.getItem('deals');
      if (localData) {
        setDeals(JSON.parse(localData));
      } else {
        // Use demo data
        const demoData = [
          {
            id: '1',
            title: 'Lawn Maintenance Contract',
            amount: 15000,
            status: 'negotiation',
            probability: 75,
            expected_close_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            companies: { name: 'Green Lawn Services' },
            contacts: { first_name: 'John', last_name: 'Smith' }
          },
          {
            id: '2',
            title: 'Snow Removal Service',
            amount: 8500,
            status: 'open',
            probability: 50,
            expected_close_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            companies: { name: 'City Property Management' },
            contacts: { first_name: 'Sarah', last_name: 'Johnson' }
          }
        ];
        setDeals(demoData);
        localStorage.setItem('deals', JSON.stringify(demoData));
      }
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContactName = (contact: { first_name: string; last_name: string } | undefined) => {
    if (!contact) return '';
    return `${contact.first_name || ''} ${contact.last_name || ''}`.trim();
  };

  const filteredDeals = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (deal.status && deal.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (deal.companies?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    getContactName(deal.contacts).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500';
      case 'won': return 'bg-green-500';
      case 'lost': return 'bg-red-500';
      case 'negotiation': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    if (probability >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  if (loading) {
    return <div className="p-6">Loading deals...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Deals</h1>
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Demo Mode
        </Badge>
        <AddItemDialog type="deal" onSuccess={fetchDeals} />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{deal.title}</CardTitle>
                    <p className="text-lg font-semibold text-green-600">
                      ${deal.amount?.toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(deal.status || 'open')}>
                  {deal.status || 'open'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {deal.companies && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{deal.companies.name}</span>
                </div>
              )}
              {deal.contacts && getContactName(deal.contacts) && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{getContactName(deal.contacts)}</span>
                </div>
              )}
              {deal.expected_close_date && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Close: {new Date(deal.expected_close_date).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2">
                <span className={`text-sm font-medium ${getProbabilityColor(deal.probability || 50)}`}>
                  {deal.probability || 50}% probability
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first deal.</p>
          <AddItemDialog type="deal" onSuccess={fetchDeals} />
        </div>
      )}
    </div>
  );
};