import { useState } from 'react';
import { GoogleMap } from './GoogleMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User } from 'lucide-react';

interface Pin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
}

interface MapWithPinsProps {
  address?: string;
  clientName?: string;
}

export const MapWithPins = ({ address, clientName }: MapWithPinsProps) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [stats, setStats] = useState({
    totalPins: 0,
    recentPins: 0
  });

  const handlePinAdd = (pin: Pin) => {
    const newPin = {
      ...pin,
      createdAt: new Date(),
      createdBy: 'Current User'
    };
    
    setPins(prev => {
      const updated = [...prev, newPin];
      updateStats(updated);
      return updated;
    });
  };

  const handlePinRemove = (pinId: string) => {
    setPins(prev => {
      const updated = prev.filter(pin => pin.id !== pinId);
      updateStats(updated);
      return updated;
    });
  };

  const updateStats = (currentPins: Pin[]) => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    setStats({
      totalPins: currentPins.length,
      recentPins: currentPins.filter(pin => 
        pin.createdAt && pin.createdAt > oneDayAgo
      ).length
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pins</p>
                <p className="text-2xl font-bold">{stats.totalPins}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recent (24h)</p>
                <p className="text-2xl font-bold">{stats.recentPins}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Client</p>
                <p className="text-lg font-medium">{clientName || 'No client'}</p>
              </div>
              <User className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Google Map */}
      <GoogleMap
        address={address}
        onPinAdd={handlePinAdd}
        onPinRemove={handlePinRemove}
        initialPins={pins}
      />

      {/* Pin History */}
      {pins.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pin History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pins.map(pin => (
                <div key={pin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{pin.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}
                      </Badge>
                    </div>
                    {pin.description && (
                      <p className="text-sm text-gray-600 mt-1">{pin.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      {pin.createdAt && (
                        <span>Created: {pin.createdAt.toLocaleDateString()}</span>
                      )}
                      {pin.createdBy && (
                        <span>By: {pin.createdBy}</span>
                      )}
                    </div>
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