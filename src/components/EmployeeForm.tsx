import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface EmployeeFormProps {
  onSuccess?: () => void;
}

export const EmployeeForm = ({ onSuccess }: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    permissions: {
      clients: false,
      invoices: false,
      reports: false,
      settings: false
    }
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
        .from('employees')
        .insert([{
          ...formData,
          company_id: user.id,
          permissions: formData.permissions
        }]);

      if (error) throw error;

      toast({ title: 'Employee added successfully!' });
      setFormData({ name: '', email: '', role: 'employee', permissions: { clients: false, invoices: false, reports: false, settings: false } });
      onSuccess?.();
    } catch (error: any) {
      toast({ title: 'Error adding employee', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const updatePermission = (key: string, value: boolean) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [key]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Permissions</Label>
            <div className="space-y-2 mt-2">
              {Object.entries(formData.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => updatePermission(key, !!checked)}
                  />
                  <Label htmlFor={key} className="capitalize">{key}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Employee'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};