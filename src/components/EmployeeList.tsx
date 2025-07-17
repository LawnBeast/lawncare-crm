import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Users, Shield, Mail } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: any;
  active: boolean;
  created_at: string;
}

export const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('company_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error: any) {
      toast({ title: 'Error fetching employees', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update({ active: !active })
        .eq('id', id);

      if (error) throw error;
      fetchEmployees();
      toast({ title: `Employee ${!active ? 'activated' : 'deactivated'}!` });
    } catch (error: any) {
      toast({ title: 'Error updating employee', description: error.message, variant: 'destructive' });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  if (loading) return <div>Loading employees...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Employees
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {employee.email}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRoleColor(employee.role)}>
                    {employee.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {Object.entries(employee.permissions || {}).map(([key, value]) => 
                      value && (
                        <Badge key={key} variant="outline" className="text-xs">
                          {key}
                        </Badge>
                      )
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={employee.active ? 'default' : 'secondary'}>
                    {employee.active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(employee.id, employee.active)}
                  >
                    {employee.active ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};