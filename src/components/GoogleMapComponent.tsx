import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Layers, Maximize2, Loader2 } from 'lucide-react';

interface Pin {
  id: string;
  address: string;
  coordinates: { lat: number; lng: number };
  measurements?: { length: number; width: number; area: number };
}

interface GoogleMapComponentProps {
  pins: Pin[];
  selectedAddress?: string;
  onPinClick: (pin: Pin) => void;
  onMapClick?: (coordinates: { lat: number; lng: number }) => void;
}

export const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  pins,
  selectedAddress,
  onPinClick,
  onMapClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google?.maps) return;

    try {
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 13,
        mapTypeId: mapType,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        styles: mapType === 'roadmap' ? [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ] : undefined
      });

      if (onMapClick) {
        mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            onMapClick({
              lat: e.latLng.lat(),
              lng: e.latLng.lng()
            });
          }
        });
      }

      infoWindowRef.current = new google.maps.InfoWindow();
      setMap(mapInstance);
      setIsLoading(false);
      setMapError(false);
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
      setMapError(true);
      setIsLoading(false);
    }
  }, [mapType, onMapClick]);

  useEffect(() => {
    const checkAndInitialize = () => {
      if (window.google?.maps) {
        initializeMap();
      } else {
        setTimeout(() => {
          if (window.google?.maps) {
            initializeMap();
          } else {
            setMapError(true);
            setIsLoading(false);
          }
        }, 2000);
      }
    };

    checkAndInitialize();
  }, [initializeMap]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Create new markers
    const newMarkers = pins.map(pin => {
      const marker = new google.maps.Marker({
        position: pin.coordinates,
        map: map,
        title: pin.address,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 6,
          fillColor: selectedAddress === pin.address ? '#dc2626' : '#ef4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        },
        animation: selectedAddress === pin.address ? google.maps.Animation.BOUNCE : undefined
      });

      marker.addListener('click', () => {
        onPinClick(pin);
        
        if (infoWindowRef.current) {
          const content = `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">${pin.address}</h3>
              ${pin.measurements ? `
                <div style="font-size: 12px; color: #666; margin-top: 4px;">
                  <div style="color: #2563eb; font-weight: 500;">
                    Area: ${pin.measurements.area.toLocaleString()} sq ft
                  </div>
                  <div>${pin.measurements.length} × ${pin.measurements.width} ft</div>
                </div>
              ` : '<div style="font-size: 12px; color: #666;">Click "Measure" to add measurements</div>'}
            </div>
          `;
          
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(map, marker);
        }
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Fit bounds to show all pins
    if (pins.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      pins.forEach(pin => bounds.extend(pin.coordinates));
      map.fitBounds(bounds);
      
      // Ensure minimum zoom level
      const listener = google.maps.event.addListener(map, 'bounds_changed', () => {
        if (map.getZoom() && map.getZoom()! > 18) {
          map.setZoom(18);
        }
        google.maps.event.removeListener(listener);
      });
    }
  }, [map, pins, selectedAddress, onPinClick]);

  const toggleMapType = () => {
    const newType = mapType === 'roadmap' ? 'satellite' : 'roadmap';
    setMapType(newType);
    if (map) {
      map.setMapTypeId(newType);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full h-96">
        <CardContent className="p-0 h-full flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading Google Maps...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (mapError || !map) {
    return null; // Will fallback to mock map
  }

  return (
    <Card className="w-full h-96">
      <CardContent className="p-0 h-full relative">
        <div ref={mapRef} className="w-full h-full" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleMapType}
            className="bg-white shadow-md hover:bg-gray-50"
          >
            <Layers className="h-4 w-4 mr-1" />
            {mapType === 'roadmap' ? 'Satellite' : 'Map'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white shadow-md hover:bg-gray-50"
            onClick={() => {
              if (map && pins.length > 0) {
                const bounds = new google.maps.LatLngBounds();
                pins.forEach(pin => bounds.extend(pin.coordinates));
                map.fitBounds(bounds);
              }
            }}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md text-xs border">
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="h-3 w-3 text-red-500" />
            <span>Property Pin</span>
          </div>
          <div className="text-gray-500">Click map to add pins</div>
        </div>
      </CardContent>
    </Card>
  );
};

declare global {
  interface Window {
    google: any;
  }
}