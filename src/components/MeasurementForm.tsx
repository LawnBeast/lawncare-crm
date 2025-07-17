import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin } from 'lucide-react';
import { SatelliteMap } from './SatelliteMap';

interface MeasurementFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  prefilledAddress?: string;
}

export const MeasurementForm: React.FC<MeasurementFormProps> = ({ onSubmit, onCancel, prefilledAddress }) => {
  const [formData, setFormData] = useState({
    type: '',
    material: '',
    length: '',
    width: '',
    depth: '',
    snowfall: '',
    location: prefilledAddress || '',
    notes: '',
    coordinates: null as any,
    area: ''
  });
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleMapMeasurement = (measurement: any) => {
    setFormData(prev => ({
      ...prev,
      type: measurement.type,
      area: measurement.area?.toFixed(2) || '',
      coordinates: measurement.coordinates,
      location: measurement.location || prev.location
    }));
    setShowMap(false);
  };

  if (showMap) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowMap(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form
          </Button>
          <h2 className="text-2xl font-bold">Satellite Measurement</h2>
        </div>
        <SatelliteMap onMeasurement={handleMapMeasurement} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Add New Measurement</h2>
      </div>

      {prefilledAddress && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <MapPin className="h-4 w-4" />
              Measuring property at: {prefilledAddress}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Measurement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lawn">Lawn</SelectItem>
                    <SelectItem value="driveway">Driveway</SelectItem>
                    <SelectItem value="flowerbed">Flower Bed</SelectItem>
                    <SelectItem value="garden">Garden</SelectItem>
                    <SelectItem value="patio">Patio</SelectItem>
                    <SelectItem value="snowfall">Snowfall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(formData.type === 'flowerbed' || formData.type === 'garden') && (
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Select value={formData.material} onValueChange={(value) => setFormData({...formData, material: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="topsoil">Topsoil</SelectItem>
                      <SelectItem value="mulch">Mulch</SelectItem>
                      <SelectItem value="stone">Stone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setShowMap(true)}>
                Use Satellite Map
              </Button>
            </div>

            {formData.type === 'snowfall' ? (
              <div>
                <Label htmlFor="snowfall">Snowfall (inches)</Label>
                <Input
                  id="snowfall"
                  type="number"
                  step="0.1"
                  value={formData.snowfall}
                  onChange={(e) => setFormData({...formData, snowfall: e.target.value})}
                  placeholder="Enter snowfall in inches"
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="length">Length (ft)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    value={formData.length}
                    onChange={(e) => setFormData({...formData, length: e.target.value})}
                    placeholder="Length"
                  />
                </div>
                <div>
                  <Label htmlFor="width">Width (ft)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    value={formData.width}
                    onChange={(e) => setFormData({...formData, width: e.target.value})}
                    placeholder="Width"
                  />
                </div>
                <div>
                  <Label htmlFor="depth">Depth (in)</Label>
                  <Input
                    id="depth"
                    type="number"
                    step="0.1"
                    value={formData.depth}
                    onChange={(e) => setFormData({...formData, depth: e.target.value})}
                    placeholder="Depth"
                  />
                </div>
              </div>
            )}

            {formData.area && (
              <div>
                <Label>Measured Area</Label>
                <Input value={`${formData.area} sq ft`} disabled />
              </div>
            )}

            <div>
              <Label htmlFor="location">Location/Address</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Property location or address"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">Save Measurement</Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};