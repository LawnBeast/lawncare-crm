import React, { useState, useMemo, useEffect } from 'react';
import { GoogleMapComponent } from './GoogleMapComponent';
import { Card, CardContent } from './ui/card';
import { MapPin, Maximize2, Layers, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

interface Pin {
  id: string;
  address: string;
  coordinates: { lat: number; lng: number };
  measurements?: { length: number; width: number; area: number };
}

interface PropertyMapViewProps {
  pins: Pin[];
  selectedAddress?: string;
  onPinClick: (pin: Pin) => void;
  onMapClick?: (coordinates: { lat: number; lng: number }) => void;
}

const MockMapView: React.FC<PropertyMapViewProps> = ({
  pins,
  selectedAddress,
  onPinClick,
  onMapClick
}) => {
  const [satelliteView, setSatelliteView] = useState(false);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  const pinPositions = useMemo(() => {
    return pins.map((pin, index) => ({
      ...pin,
      x: 20 + (index * 60) % 300,
      y: 30 + (index * 40) % 200
    }));
  }, [pins]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onMapClick) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const lat = 40.7128 + (y / rect.height - 0.5) * 0.01;
    const lng = -74.0060 + (x / rect.width - 0.5) * 0.01;
    
    onMapClick({ lat, lng });
  };

  return (
    <Card className="w-full h-96">
      <CardContent className="p-0 h-full relative">
        <div 
          className={`w-full h-full relative overflow-hidden cursor-crosshair transition-colors duration-300 ${
            satelliteView 
              ? 'bg-gradient-to-br from-gray-700 via-green-800 to-brown-700' 
              : 'bg-gradient-to-br from-green-50 via-blue-50 to-gray-100'
          }`}
          onClick={handleMapClick}
        >
          {!satelliteView && (
            <>
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-300" />
                  ))}
                </div>
              </div>
              
              <div className="absolute inset-0">
                <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-400 opacity-60" />
                <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-400 opacity-60" />
                <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400 opacity-60" />
                <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400 opacity-60" />
              </div>
            </>
          )}
          
          {satelliteView && (
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-green-600 opacity-40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${10 + Math.random() * 30}px`,
                    height: `${10 + Math.random() * 30}px`
                  }}
                />
              ))}
            </div>
          )}
          
          {pinPositions.map((pin) => (
            <div
              key={pin.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 hover:z-10"
              style={{ left: `${pin.x}px`, top: `${pin.y}px` }}
              onClick={(e) => {
                e.stopPropagation();
                onPinClick(pin);
              }}
              onMouseEnter={() => setHoveredPin(pin.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              <div className="relative">
                <MapPin 
                  className={`h-8 w-8 drop-shadow-lg transition-colors ${
                    selectedAddress === pin.address 
                      ? 'text-red-600' 
                      : 'text-red-500'
                  }`} 
                />
                {pin.measurements && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                )}
              </div>
              
              {(hoveredPin === pin.id || selectedAddress === pin.address) && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap z-20 max-w-48 border">
                  <div className="truncate font-medium">{pin.address}</div>
                  {pin.measurements && (
                    <div className="text-blue-600 font-medium">
                      {pin.measurements.area} sq ft
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button 
              variant={satelliteView ? "default" : "outline"} 
              size="sm" 
              className="bg-white hover:bg-gray-100 shadow-md"
              onClick={() => setSatelliteView(!satelliteView)}
            >
              <Layers className="h-4 w-4 mr-1" />
              {satelliteView ? 'Map' : 'Satellite'}
            </Button>
            <Button variant="outline" size="sm" className="bg-white hover:bg-gray-100 shadow-md">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md text-xs border">
            <div className="flex items-center gap-1 mb-1">
              <MapPin className="h-3 w-3 text-red-500" />
              <span>Property Pin</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Measured</span>
            </div>
          </div>
          
          <div className="absolute top-4 left-4 bg-blue-50 border border-blue-200 text-blue-800 px-2 py-1 rounded text-xs">
            Click anywhere to add a property pin
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const PropertyMapView: React.FC<PropertyMapViewProps> = (props) => {
  const [useGoogleMaps, setUseGoogleMaps] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setUseGoogleMaps(true);
        setMapError(false);
      } else {
        setTimeout(() => {
          if (window.google && window.google.maps) {
            setUseGoogleMaps(true);
            setMapError(false);
          } else {
            setMapError(true);
          }
        }, 2000);
      }
    };

    checkGoogleMaps();
  }, []);

  if (useGoogleMaps && !mapError) {
    return <GoogleMapComponent {...props} />;
  }

  return (
    <div className="space-y-2">
      {mapError && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Google Maps unavailable. Using demo map view.
          </AlertDescription>
        </Alert>
      )}
      <MockMapView {...props} />
    </div>
  );
};