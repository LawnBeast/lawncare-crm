import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Ruler, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface PropertyPinProps {
  id: string;
  address: string;
  coordinates: { lat: number; lng: number };
  measurements?: { length: number; width: number; area: number };
  onRemove: (id: string) => void;
  onMeasure: (id: string) => void;
}

export const PropertyPin: React.FC<PropertyPinProps> = ({
  id,
  address,
  coordinates,
  measurements,
  onRemove,
  onMeasure
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  const formatArea = (area: number) => {
    if (area >= 43560) {
      return `${(area / 43560).toFixed(2)} acres`;
    }
    return `${area.toLocaleString()} sq ft`;
  };

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
        isHovered ? 'ring-2 ring-blue-200 bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-1">
              <MapPin className="h-5 w-5 text-red-500" />
            </div>
            
            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <div className="font-medium text-gray-900 truncate" title={address}>
                  {address}
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  {formatCoordinates(coordinates.lat, coordinates.lng)}
                </div>
              </div>
              
              {measurements && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Ruler className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium text-green-800">Measured</span>
                  </div>
                  <div className="text-sm font-semibold text-green-900">
                    {formatArea(measurements.area)}
                  </div>
                  <div className="text-xs text-green-700">
                    {measurements.length} × {measurements.width} ft
                  </div>
                </div>
              )}
              
              {!measurements && (
                <Badge variant="outline" className="text-xs">
                  Not measured
                </Badge>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={() => onMeasure(id)}
                className="flex items-center gap-2"
              >
                <Ruler className="h-4 w-4" />
                {measurements ? 'Update Measurements' : 'Measure Property'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onRemove(id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Remove Pin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onMeasure(id)}
            className="flex-1 text-xs"
          >
            <Ruler className="h-3 w-3 mr-1" />
            {measurements ? 'Update' : 'Measure'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onRemove(id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};