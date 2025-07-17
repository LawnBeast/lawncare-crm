import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface AddressSearchProps {
  onAddressSelect: (address: string, coordinates: { lat: number; lng: number }) => void;
}

interface SearchResult {
  address: string;
  coordinates: { lat: number; lng: number };
  type: string;
}

const SAMPLE_ADDRESSES: SearchResult[] = [
  { address: '123 Main St, New York, NY 10001', coordinates: { lat: 40.7589, lng: -73.9851 }, type: 'Residential' },
  { address: '456 Broadway, New York, NY 10013', coordinates: { lat: 40.7505, lng: -74.0025 }, type: 'Commercial' },
  { address: '789 Park Ave, New York, NY 10021', coordinates: { lat: 40.7736, lng: -73.9566 }, type: 'Residential' },
  { address: '321 Fifth Ave, New York, NY 10016', coordinates: { lat: 40.7484, lng: -73.9857 }, type: 'Commercial' },
  { address: '654 Wall St, New York, NY 10005', coordinates: { lat: 40.7074, lng: -74.0113 }, type: 'Financial' },
  { address: '987 Central Park West, New York, NY 10025', coordinates: { lat: 40.7829, lng: -73.9654 }, type: 'Luxury' },
  { address: '147 Houston St, New York, NY 10012', coordinates: { lat: 40.7256, lng: -73.9986 }, type: 'Mixed Use' },
  { address: '258 Madison Ave, New York, NY 10016', coordinates: { lat: 40.7505, lng: -73.9799 }, type: 'Office' }
];

export const AddressSearch: React.FC<AddressSearchProps> = ({ onAddressSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    return SAMPLE_ADDRESSES
      .filter(addr => 
        addr.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        addr.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);
  }, [searchTerm]);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter an address to search",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const exactMatch = SAMPLE_ADDRESSES.find(addr => 
        addr.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (exactMatch) {
        onAddressSelect(exactMatch.address, exactMatch.coordinates);
        setSearchTerm('');
        setShowSuggestions(false);
        toast({
          title: "Address Found",
          description: `Added pin for ${exactMatch.address}`,
        });
      } else {
        // Generate random coordinates for unknown addresses
        const randomCoords = {
          lat: 40.7128 + (Math.random() - 0.5) * 0.02,
          lng: -74.0060 + (Math.random() - 0.5) * 0.02
        };
        onAddressSelect(searchTerm, randomCoords);
        setSearchTerm('');
        setShowSuggestions(false);
        toast({
          title: "Address Added",
          description: `Added pin for ${searchTerm}`,
        });
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to search address. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  }, [searchTerm, onAddressSelect, toast]);

  const handleSuggestionClick = (suggestion: SearchResult) => {
    onAddressSelect(suggestion.address, suggestion.coordinates);
    setSearchTerm('');
    setShowSuggestions(false);
    toast({
      title: "Address Selected",
      description: `Added pin for ${suggestion.address}`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Search className="h-5 w-5" />
          Address Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="flex gap-2">
            <Input
              placeholder="Enter address or property type..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onFocus={() => setShowSuggestions(searchTerm.length > 0)}
              className="flex-1"
              disabled={isSearching}
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !searchTerm.trim()}
              size="sm"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {suggestion.address}
                      </div>
                      <div className="text-xs text-gray-500">
                        {suggestion.type}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          <div className="mb-1">Quick searches:</div>
          <div className="flex flex-wrap gap-1">
            {['Main St', 'Broadway', 'Park Ave', 'Commercial'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchTerm(term);
                  setShowSuggestions(true);
                }}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};