import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Trash2, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Pin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description?: string;
}

interface GoogleMapProps {
  address?: string;
  onPinAdd?: (pin: Pin) => void;
  onPinRemove?: (pinId: string) => void;
  initialPins?: Pin[];
}

export const GoogleMap = ({ address, onPinAdd, onPinRemove, initialPins = [] }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pins, setPins] = useState<Pin[]>(initialPins);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [newPinTitle, setNewPinTitle] = useState('');
  const [newPinDescription, setNewPinDescription] = useState('');
  const [pendingLocation, setPendingLocation] = useState<{lat: number, lng: number} | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BvqVqhBdYqc&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    setMap(mapInstance);

    // Add click listener for adding pins
    mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (isAddingPin && e.latLng) {
        setPendingLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
      }
    });

    // Geocode address if provided
    if (address) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          mapInstance.setCenter(results[0].geometry.location);
        }
      });
    }
  };

  // Update markers when pins change
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    pins.forEach(pin => {
      const marker = new google.maps.Marker({
        position: { lat: pin.lat, lng: pin.lng },
        map: map,
        title: pin.title,
        draggable: true
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${pin.title}</h3>
            ${pin.description ? `<p style="margin: 0;">${pin.description}</p>` : ''}
            <button onclick="window.removePin('${pin.id}')" style="margin-top: 8px; padding: 4px 8px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Remove</button>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        setSelectedPin(pin);
      });

      markersRef.current.push(marker);
    });
  }, [pins, map]);

  // Global function for removing pins from info window
  useEffect(() => {
    (window as any).removePin = (pinId: string) => {
      handleRemovePin(pinId);
    };
  }, []);

  const handleAddPin = () => {
    if (!pendingLocation || !newPinTitle.trim()) return;

    const newPin: Pin = {
      id: Date.now().toString(),
      lat: pendingLocation.lat,
      lng: pendingLocation.lng,
      title: newPinTitle.trim(),
      description: newPinDescription.trim() || undefined
    };

    setPins(prev => [...prev, newPin]);
    onPinAdd?.(newPin);
    
    // Reset form
    setNewPinTitle('');
    setNewPinDescription('');
    setPendingLocation(null);
    setIsAddingPin(false);
  };

  const handleRemovePin = (pinId: string) => {
    setPins(prev => prev.filter(pin => pin.id !== pinId));
    onPinRemove?.(pinId);
    setSelectedPin(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Google Maps
            {address && <span className="text-sm text-gray-600">- {address}</span>}
          </div>
          <div className="flex gap-2">
            <Button
              variant={isAddingPin ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAddingPin(!isAddingPin)}
            >
              <Plus className="h-4 w-4 mr-1" />
              {isAddingPin ? 'Cancel' : 'Add Pin'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isAddingPin && (
            <div className="p-4 bg-blue-50 rounded-lg space-y-3">
              <p className="text-sm text-blue-700">Click on the map to place a pin</p>
              {pendingLocation && (
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="pin-title">Pin Title</Label>
                    <Input
                      id="pin-title"
                      value={newPinTitle}
                      onChange={(e) => setNewPinTitle(e.target.value)}
                      placeholder="Enter pin title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pin-description">Description (optional)</Label>
                    <Input
                      id="pin-description"
                      value={newPinDescription}
                      onChange={(e) => setNewPinDescription(e.target.value)}
                      placeholder="Enter description"
                    />
                  </div>
                  <Button onClick={handleAddPin} disabled={!newPinTitle.trim()}>
                    Add Pin
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <div ref={mapRef} className="w-full h-96 rounded-lg border" />
          
          {pins.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Pins ({pins.length})</h4>
              <div className="space-y-1">
                {pins.map(pin => (
                  <div key={pin.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{pin.title}</span>
                      {pin.description && <p className="text-sm text-gray-600">{pin.description}</p>}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePin(pin.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};