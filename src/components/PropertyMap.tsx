import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  measurements: any[];
  address: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({ measurements, address }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      // Add markers for measurements with coordinates
      measurements.forEach((measurement) => {
        if (measurement.coordinates && measurement.coordinates.length > 0) {
          const center = measurement.coordinates[0];
          
          const marker = new google.maps.Marker({
            position: { lat: center.lat, lng: center.lng },
            map,
            title: `${measurement.type} - ${measurement.location}`,
            icon: {
              url: getMarkerIcon(measurement.type),
              scaledSize: new google.maps.Size(32, 32),
            },
          });

          // Create polygon for area measurements
          if (measurement.coordinates.length > 2) {
            const polygon = new google.maps.Polygon({
              paths: measurement.coordinates,
              strokeColor: getTypeColor(measurement.type),
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: getTypeColor(measurement.type),
              fillOpacity: 0.35,
            });
            polygon.setMap(map);
          }

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div>
                <strong>${measurement.type}</strong><br/>
                ${measurement.location}<br/>
                ${measurement.area ? `Area: ${measurement.area.toFixed(1)} sq ft` : ''}
                ${measurement.material ? `<br/>Material: ${measurement.material}` : ''}
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        }
      });
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [measurements]);

  const getMarkerIcon = (type: string) => {
    const color = getTypeColor(type);
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="2"/>
      </svg>`
    )}`;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      lawn: '#22c55e',
      driveway: '#64748b',
      flowerbed: '#f59e0b',
      garden: '#16a34a',
      patio: '#8b5cf6',
      snowfall: '#3b82f6',
    };
    return colors[type as keyof typeof colors] || '#3b82f6';
  };

  const coordinateMeasurements = measurements.filter(m => m.coordinates && m.coordinates.length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Property Map - {address}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapRef} 
          className="w-full h-96 rounded-lg border"
          style={{ minHeight: '400px' }}
        />
        
        {coordinateMeasurements.length === 0 && (
          <div className="mt-4 text-center text-gray-500">
            <p>No satellite measurements to display on map.</p>
            <p className="text-sm">Use the satellite measurement tool to add location data.</p>
          </div>
        )}
        
        {coordinateMeasurements.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Mapped Measurements ({coordinateMeasurements.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {coordinateMeasurements.map((measurement, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: getTypeColor(measurement.type) }}
                  />
                  <span className="capitalize">{measurement.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};