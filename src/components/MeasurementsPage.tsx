import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MapPin, Search, Snowflake, Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MeasurementForm } from './MeasurementForm';
import { MeasurementList } from './MeasurementList';
import { SatelliteMap } from './SatelliteMap';
import { AddressSearch } from './AddressSearch';
import { supabase, testConnection } from '@/lib/supabase';

export const MeasurementsPage = () => {
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedCoordinates, setSelectedCoordinates] = useState<{lat: number; lng: number} | null>(null);

  useEffect(() => {
    loadMeasurements();
  }, []);

  const loadMeasurements = async () => {
    try {
      setLoading(true);
      const connected = await testConnection();
      setIsOnline(connected);
      
      if (connected) {
        const { data, error } = await supabase
          .from('measurements')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.warn('Database error:', error);
          loadFromLocalStorage();
        } else {
          setMeasurements(data || []);
        }
      } else {
        loadFromLocalStorage();
      }
    } catch (error) {
      console.warn('Load error:', error);
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('measurements');
    if (stored) {
      setMeasurements(JSON.parse(stored));
    }
  };

  const saveToLocalStorage = (data: any[]) => {
    localStorage.setItem('measurements', JSON.stringify(data));
  };

  const handleAddressSelect = (address: string, coordinates: { lat: number; lng: number }) => {
    setSelectedAddress(address);
    setSelectedCoordinates(coordinates);
  };

  const handleAddMeasurement = async (data: any) => {
    const newMeasurement = {
      id: Date.now().toString(),
      ...data,
      address: selectedAddress || data.location,
      coordinates: selectedCoordinates,
      created_at: new Date().toISOString()
    };
    
    const updatedMeasurements = [newMeasurement, ...measurements];
    setMeasurements(updatedMeasurements);
    saveToLocalStorage(updatedMeasurements);
    
    if (isOnline) {
      try {
        await supabase.from('measurements').insert(newMeasurement);
      } catch (error) {
        console.warn('Failed to save to database:', error);
      }
    }
    
    setShowForm(false);
    setSelectedAddress('');
    setSelectedCoordinates(null);
  };

  const handleMapMeasurement = (measurement: any) => {
    handleAddMeasurement(measurement);
  };

  const filterMeasurements = (type?: string) => {
    let filtered = measurements;
    
    if (type && type !== 'all') {
      filtered = filtered.filter(m => m.type === type);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(measurement =>
        measurement.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        measurement.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        measurement.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        measurement.material?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStats = () => {
    const flowerBeds = measurements.filter(m => m.type === 'flowerbed');
    const snowfall = measurements.filter(m => m.type === 'snowfall');
    const driveways = measurements.filter(m => m.type === 'driveway');
    
    const totalArea = flowerBeds.reduce((sum, m) => sum + ((m.area || (m.length * m.width)) || 0), 0);
    const totalSnowfall = snowfall.reduce((sum, m) => sum + (m.snowfall || 0), 0);
    
    return {
      totalMeasurements: measurements.length,
      flowerBedArea: totalArea,
      totalSnowfall,
      driveways: driveways.length
    };
  };

  const stats = getStats();

  if (showForm) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Add New Measurement</h1>
          <Button variant="outline" onClick={() => setShowForm(false)}>
            Back to List
          </Button>
        </div>
        
        {selectedAddress && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <MapPin className="h-4 w-4" />
                Selected Address: {selectedAddress}
              </div>
            </CardContent>
          </Card>
        )}
        
        <MeasurementForm
          onSubmit={handleAddMeasurement}
          onCancel={() => {
            setShowForm(false);
            setSelectedAddress('');
            setSelectedCoordinates(null);
          }}
          prefilledAddress={selectedAddress}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Property Measurements</h1>
          {!isOnline && (
            <p className="text-sm text-amber-600 mt-1">Offline mode - using local storage</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant={showMap ? "default" : "outline"}
            onClick={() => setShowMap(!showMap)}
          >
            <MapPin className="h-4 w-4 mr-2" />
            {showMap ? "Hide Map" : "Satellite Map"}
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Measurement
          </Button>
        </div>
      </div>

      {/* Address Search */}
      <AddressSearch onAddressSelect={handleAddressSelect} />
      
      {selectedAddress && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <MapPin className="h-4 w-4" />
                Ready to measure: {selectedAddress}
              </div>
              <Button size="sm" onClick={() => setShowForm(true)}>
                Start Measurement
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.totalMeasurements}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-green-100 rounded flex items-center justify-center">
                <span className="text-xs text-green-600">🌸</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Flower Beds</p>
                <p className="text-2xl font-bold">{stats.flowerBedArea.toFixed(0)} sq ft</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Snowflake className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Snowfall</p>
                <p className="text-2xl font-bold">{stats.totalSnowfall.toFixed(1)}"</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs text-gray-600">🚗</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Driveways</p>
                <p className="text-2xl font-bold">{stats.driveways}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showMap && (
        <SatelliteMap onMeasurement={handleMapMeasurement} />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Measurements</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search measurements or addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="flowerbed">Flower Beds</TabsTrigger>
              <TabsTrigger value="snowfall">Snowfall</TabsTrigger>
              <TabsTrigger value="driveway">Driveways</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <MeasurementList measurements={filterMeasurements()} loading={loading} />
            </TabsContent>
            <TabsContent value="flowerbed" className="mt-4">
              <MeasurementList measurements={filterMeasurements('flowerbed')} loading={loading} />
            </TabsContent>
            <TabsContent value="snowfall" className="mt-4">
              <MeasurementList measurements={filterMeasurements('snowfall')} loading={loading} />
            </TabsContent>
            <TabsContent value="driveway" className="mt-4">
              <MeasurementList measurements={filterMeasurements('driveway')} loading={loading} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};