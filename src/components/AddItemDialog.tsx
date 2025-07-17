import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface AddItemDialogProps {
  type: 'company' | 'contact' | 'deal' | 'measurement';
  onSuccess?: () => void;
}

export const AddItemDialog: React.FC<AddItemDialogProps> = ({ type, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let table = '';
      let data = {};

      switch (type) {
        case 'company':
          table = 'companies';
          data = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            status: formData.status || 'active'
          };
          break;
        case 'contact':
          table = 'contacts';
          data = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            position: formData.position,
            company_id: formData.company_id
          };
          break;
        case 'deal':
          table = 'deals';
          data = {
            title: formData.title,
            amount: parseFloat(formData.amount) || 0,
            status: formData.status || 'open',
            company_id: formData.company_id,
            contact_id: formData.contact_id
          };
          break;
        case 'measurement':
          table = 'measurements';
          data = {
            property_address: formData.property_address,
            area_sqft: parseFloat(formData.area_sqft) || 0,
            service_type: formData.service_type,
            notes: formData.notes
          };
          break;
      }

      const { error } = await supabase.from(table).insert([data]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`,
      });

      setOpen(false);
      setFormData({});
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to add ${type}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'company':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </>
        );
      case 'contact':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Contact Name</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
          </>
        );
      case 'deal':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Deal Title</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount || ''}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status || 'open'} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case 'measurement':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="property_address">Property Address</Label>
              <Input
                id="property_address"
                value={formData.property_address || ''}
                onChange={(e) => setFormData({ ...formData, property_address: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area_sqft">Area (sq ft)</Label>
              <Input
                id="area_sqft"
                type="number"
                value={formData.area_sqft || ''}
                onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service_type">Service Type</Label>
              <Select value={formData.service_type || ''} onValueChange={(value) => setFormData({ ...formData, service_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="snow_plowing">Snow Plowing</SelectItem>
                  <SelectItem value="salting">Salting</SelectItem>
                  <SelectItem value="landscaping">Landscaping</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New {type.charAt(0).toUpperCase() + type.slice(1)}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};