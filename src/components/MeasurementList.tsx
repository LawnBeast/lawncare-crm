import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Snowflake, Calculator, MapPin, Ruler } from 'lucide-react';

interface MeasurementListProps {
  measurements: any[];
  loading: boolean;
}

export const MeasurementList: React.FC<MeasurementListProps> = ({ measurements, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (measurements.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No measurements found</p>
        <p className="text-sm mt-2">Use the address search above to find properties to measure</p>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'snowfall':
        return <Snowflake className="h-4 w-4 text-blue-600" />;
      case 'lawn':
        return <span className="text-green-600">🌱</span>;
      case 'driveway':
        return <span className="text-gray-600">🚗</span>;
      case 'flowerbed':
        return <span className="text-pink-600">🌸</span>;
      case 'garden':
        return <span className="text-green-700">🌿</span>;
      case 'patio':
        return <span className="text-amber-600">🏠</span>;
      default:
        return <Calculator className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMaterialBadge = (material: string) => {
    const colors = {
      topsoil: 'bg-amber-100 text-amber-800',
      mulch: 'bg-orange-100 text-orange-800',
      stone: 'bg-slate-100 text-slate-800'
    };
    return colors[material as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatMeasurement = (measurement: any) => {
    if (measurement.type === 'snowfall') {
      return `${measurement.snowfall || 0}" snowfall`;
    }
    
    const area = measurement.area || (measurement.length * measurement.width);
    const volume = area * (measurement.depth || 0) / 12; // Convert inches to feet
    
    return (
      <div className="space-y-1">
        <div>Area: {area.toFixed(1)} sq ft</div>
        {measurement.depth && (
          <div>Volume: {volume.toFixed(1)} cubic ft</div>
        )}
        {measurement.length && measurement.width && (
          <div className="text-sm text-gray-500">
            {measurement.length}' × {measurement.width}' × {measurement.depth || 0}"
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {measurements.map((measurement) => (
        <Card key={measurement.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(measurement.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold capitalize">
                      {measurement.type}
                    </h3>
                    {measurement.material && (
                      <Badge className={getMaterialBadge(measurement.material)}>
                        {measurement.material}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {formatMeasurement(measurement)}
                  </div>
                  
                  {(measurement.location || measurement.address) && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <MapPin className="h-3 w-3" />
                      {measurement.address || measurement.location}
                    </div>
                  )}
                  
                  {measurement.coordinates && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <Ruler className="h-3 w-3" />
                      Satellite measured
                    </div>
                  )}
                  
                  {measurement.notes && (
                    <div className="text-sm text-gray-600 mt-2">
                      {measurement.notes}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                {new Date(measurement.created_at).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};