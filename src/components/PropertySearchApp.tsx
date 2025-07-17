import React, { useState, lazy, Suspense } from 'react';
import { AddressSearch } from './AddressSearch';
import { PropertyPin } from './PropertyPin';
import { MeasurementTool } from './MeasurementTool';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MapPin, Search } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

// Lazy load the map component to improve initial load time
const PropertyMapView = lazy(() => import('./PropertyMapView').then(module => ({ default: module.PropertyMapView })));

interface Pin {
  id: string;
  address: string;
  coordinates: { lat: number; lng: number };
  measurements?: { length: number; width: number; area: number };
}

export const PropertySearchApp: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [measuringPropertyId, setMeasuringPropertyId] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleAddressSelect = (address: string, coordinates: { lat: number; lng: number }) => {
    const newPin: Pin = {
      id: Date.now().toString(),
      address,
      coordinates
    };
    
    setPins(prev => [...prev, newPin]);
    setSelectedAddress(address);
  };

  const handleMapClick = (coordinates: { lat: number; lng: number }) => {
    const address = `Property at ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
    handleAddressSelect(address, coordinates);
  };

  const handleRemovePin = (id: string) => {
    setPins(prev => prev.filter(pin => pin.id !== id));
    const removedPin = pins.find(pin => pin.id === id);
    if (removedPin && removedPin.address === selectedAddress) {
      setSelectedAddress('');
    }
  };

  const handleMeasureProperty = (id: string) => {
    setMeasuringPropertyId(id);
  };

  const handleSaveMeasurement = (propertyId: string, measurements: { length: number; width: number; area: number }) => {
    setPins(prev => prev.map(pin => 
      pin.id === propertyId 
        ? { ...pin, measurements }
        : pin
    ));
    setMeasuringPropertyId(null);
  };

  const handleCancelMeasurement = () => {
    setMeasuringPropertyId(null);
  };

  const handlePinClick = (pin: Pin) => {
    setSelectedAddress(pin.address);
  };

  const measuringProperty = pins.find(pin => pin.id === measuringPropertyId);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-6 w-6" />
              Property Search & Measurement Tool
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Search & Controls */}
          <div className="space-y-4">
            <AddressSearch onAddressSelect={handleAddressSelect} />
            
            {measuringProperty && (
              <MeasurementTool
                propertyId={measuringProperty.id}
                address={measuringProperty.address}
                onSave={handleSaveMeasurement}
                onCancel={handleCancelMeasurement}
              />
            )}
            
            {/* Property Pins List */}
            {pins.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5" />
                    Pinned Properties ({pins.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pins.map(pin => (
                    <PropertyPin
                      key={pin.id}
                      id={pin.id}
                      address={pin.address}
                      coordinates={pin.coordinates}
                      measurements={pin.measurements}
                      onRemove={handleRemovePin}
                      onMeasure={handleMeasureProperty}
                    />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Map */}
          <div className="lg:col-span-2">
            <Suspense fallback={
              <Card className="w-full h-96">
                <CardContent className="p-4 h-full">
                  <Skeleton className="w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-500">Loading map...</div>
                  </div>
                </CardContent>
              </Card>
            }>
              <PropertyMapView
                pins={pins}
                selectedAddress={selectedAddress}
                onPinClick={handlePinClick}
                onMapClick={handleMapClick}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};