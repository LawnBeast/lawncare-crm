import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Trash2, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface Pin {
  id: string;
  client_id?: string;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  created_by?: string;
}

interface GoogleMapWithDBProps {
  address?: string;
  clientId?: string;
  clientName?: string;
}

export const GoogleMapWithDB = ({ address, clientId, clientName }: GoogleMapWithDBProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [newPinTitle, setNewPinTitle] = useState('');
  const [newPinDescription, setNewPinDescription] = useState('');
  const [pendingLocation, setPendingLocation] = useState<{lat: number, lng: number} | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { toast } = useToast();

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

  // Load pins from database
  useEffect(() => {
    if (clientId) {
      loadPins();
    }
  }, [clientId]);

  const loadPins = async () => {
    if (!clientId) return;
    
    try {
      const { data, error } = await supabase
        .from('pins')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPins(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load pins',
        variant: 'destructive',
      });
    }
  };

  const initializeMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    setMap(mapInstance);

    mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (isAddingPin && e.latLng) {
        setPendingLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
      }
    });

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

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    pins.forEach(pin => {
      const marker = new google.maps.Marker({
        position: { lat: pin.latitude, lng: pin.longitude },
        map: map,
        title: pin.title
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${pin.title}</h3>
            ${pin.description ? `<p style="margin: 0 0 8px 0;">${pin.description}</p>` : ''}
            <button onclick="window.removePin('${pin.id}')" style="padding: 4px 8px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Remove</button>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });
  }, [pins, map]);

  useEffect(() => {
    (window as any).removePin = (pinId: string) => {
      handleRemovePin(pinId);
    };
  }, []);

  const handleAddPin = async () => {
    if (!pendingLocation || !newPinTitle.trim() || !clientId) return;

    try {
      const { data, error } = await supabase
        .from('pins')
        .insert({
          client_id: clientId,
          title: newPinTitle.trim(),
          description: newPinDescription.trim() || null,
          latitude: pendingLocation.lat,
          longitude: pendingLocation.lng,
          created_by: 'Current User'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Pin added successfully!',
      });

      setNewPinTitle('');
      setNewPinDescription('');
      setPendingLocation(null);
      setIsAddingPin(false);
      loadPins();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to add pin',
        variant: 'destructive',
      });
    }
  };

  const handleRemovePin = async (pinId: string) => {
    try {
      const { error } = await supabase
        .from('pins')
        .delete()
        .eq('id', pinId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Pin removed successfully!',
      });

      loadPins();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to remove pin',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Google Maps - {clientName}
            {address && <span className="text-sm text-gray-600">({address})</span>}
          </div>
          <Button
            variant={isAddingPin ? "default" : "outline"}
            size="sm"
            onClick={() => setIsAddingPin(!isAddingPin)}
          >
            <Plus className="h-4 w-4 mr-1" />
            {isAddingPin ? 'Cancel' : 'Add Pin'}
          </Button>
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
                    <Save className="h-4 w-4 mr-2" />
                    Save Pin
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <div ref={mapRef} className="w-full h-96 rounded-lg border" />
          
          {pins.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Saved Pins ({pins.length})</h4>
              <div className="space-y-1">
                {pins.map(pin => (
                  <div key={pin.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{pin.title}</span>
                      {pin.description && <p className="text-sm text-gray-600">{pin.description}</p>}
                      <p className="text-xs text-gray-500">
                        {pin.latitude.toFixed(6)}, {pin.longitude.toFixed(6)}
                      </p>
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