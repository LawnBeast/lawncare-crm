import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Search, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { AddItemDialog } from "./AddItemDialog";

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  status: string;
  created_at: string;
}

export const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      // Load from localStorage or use demo data
      const localData = localStorage.getItem('companies');
      if (localData) {
        setCompanies(JSON.parse(localData));
      } else {
        // Use demo data
        const demoData = [
          {
            id: '1',
            name: 'Green Lawn Services',
            email: 'info@greenlawn.com',
            phone: '(555) 123-4567',
            industry: 'Landscaping',
            status: 'active',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            name: 'City Property Management',
            email: 'contact@citypm.com',
            phone: '(555) 987-6543',
            industry: 'Property Management',
            status: 'prospect',
            created_at: new Date().toISOString()
          }
        ];
        setCompanies(demoData);
        localStorage.setItem('companies', JSON.stringify(demoData));
      }
    } catch (error) {
      console.error('Error loading companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.industry && company.industry.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'prospect': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="p-6">Loading companies...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Demo Mode
        </Badge>
        <AddItemDialog type="company" onSuccess={fetchCompanies} />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <p className="text-sm text-gray-600">{company.industry || 'No industry'}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(company.status)}>
                  {company.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {company.email && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{company.email}</span>
                </div>
              )}
              {company.phone && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{company.phone}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-500">
                  Added {new Date(company.created_at).toLocaleDateString()}
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first company.</p>
          <AddItemDialog type="company" onSuccess={fetchCompanies} />
        </div>
      )}
    </div>
  );
};