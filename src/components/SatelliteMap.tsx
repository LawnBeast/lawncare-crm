import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Ruler, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Pin {
  id: string;
  lat: number;
  lng: number;
  type: 'lawn' | 'driveway' | 'flowerbed' | 'garden' | 'patio';
  title: string;
  area?: number;
}

interface SatelliteMapProps {
  onMeasurement?: (measurement: any) => void;
}

export const SatelliteMap: React.FC<SatelliteMapProps> = ({ onMeasurement }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [selectedPinType, setSelectedPinType] = useState<string>('lawn');
  const [measuring, setMeasuring] = useState(false);
  const [measurementPath, setMeasurementPath] = useState<any[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Mock Google Maps implementation for demo
    const mockMap = document.createElement('div');
    mockMap.style.width = '100%';
    mockMap.style.height = '400px';
    mockMap.style.backgroundColor = '#4a5568';
    mockMap.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23718096" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"/%3E%3C/g%3E%3C/svg%3E")';
    mockMap.style.display = 'flex';
    mockMap.style.alignItems = 'center';
    mockMap.style.justifyContent = 'center';
    mockMap.style.color = 'white';
    mockMap.style.fontSize = '18px';
    mockMap.style.borderRadius = '8px';
    mockMap.style.cursor = 'crosshair';
    mockMap.innerHTML = measuring ? 'Click to measure area' : 'Click to add pins';

    mockMap.addEventListener('click', (e) => {
      const rect = mockMap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (measuring) {
        const newPath = [...measurementPath, { x, y }];
        setMeasurementPath(newPath);
        
        if (newPath.length >= 3) {
          const area = Math.random() * 1000 + 100; // Mock area calculation
          if (onMeasurement) {
            onMeasurement({
              type: selectedPinType,
              area: area,
              coordinates: newPath,
              location: `${selectedPinType} measurement`,
            });
          }
          setMeasuring(false);
          setMeasurementPath([]);
        }
      } else {
        const newPin: Pin = {
          id: Date.now().toString(),
          lat: 40.7128 + (Math.random() - 0.5) * 0.01,
          lng: -74.0060 + (Math.random() - 0.5) * 0.01,
          type: selectedPinType as any,
          title: `${selectedPinType} ${pins.length + 1}`,
        };
        setPins([...pins, newPin]);
      }
    });

    if (mapRef.current) {
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(mockMap);
    }
  }, [measuring, measurementPath, pins, selectedPinType, onMeasurement]);

  const startMeasurement = () => {
    setMeasuring(true);
    setMeasurementPath([]);
  };

  const clearPins = () => {
    setPins([]);
    setMeasurementPath([]);
    setMeasuring(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Satellite Measurement Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Select value={selectedPinType} onValueChange={setSelectedPinType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lawn">Lawn</SelectItem>
                  <SelectItem value="driveway">Driveway</SelectItem>
                  <SelectItem value="flowerbed">Flower Bed</SelectItem>
                  <SelectItem value="garden">Garden</SelectItem>
                  <SelectItem value="patio">Patio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={measuring ? "destructive" : "default"}
                onClick={startMeasurement}
                disabled={measuring}
              >
                <Ruler className="h-4 w-4 mr-2" />
                Measure Area
              </Button>
              <Button variant="outline" onClick={clearPins}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
          
          <div ref={mapRef} className="w-full h-96 rounded-lg border" />
          
          {measuring && (
            <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
              Click 3+ points to measure area. Points: {measurementPath.length}
            </div>
          )}
        </CardContent>
      </Card>
      
      {pins.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pins ({pins.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pins.map((pin) => (
                <div key={pin.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{pin.title}</span>
                    <span className="text-sm text-gray-500 ml-2">({pin.type})</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};