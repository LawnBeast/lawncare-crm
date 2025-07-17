import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Ruler, Save, X, Calculator } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface MeasurementToolProps {
  propertyId: string;
  address: string;
  onSave: (propertyId: string, measurements: { length: number; width: number; area: number }) => void;
  onCancel: () => void;
}

export const MeasurementTool: React.FC<MeasurementToolProps> = ({
  propertyId,
  address,
  onSave,
  onCancel
}) => {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const calculateArea = useCallback(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    return l && w ? l * w : 0;
  }, [length, width]);

  const area = calculateArea();

  const handleSave = async () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    
    if (!l || !w || l <= 0 || w <= 0) {
      toast({
        title: "Invalid Measurements",
        description: "Please enter valid positive numbers for length and width",
        variant: "destructive"
      });
      return;
    }

    if (l > 10000 || w > 10000) {
      toast({
        title: "Measurements Too Large",
        description: "Please enter realistic measurements (under 10,000 ft)",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    try {
      // Simulate calculation delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const measurements = {
        length: l,
        width: w,
        area: l * w
      };
      
      onSave(propertyId, measurements);
      
      toast({
        title: "Measurements Saved",
        description: `Property area: ${measurements.area.toLocaleString()} sq ft`,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Unable to save measurements. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setLength(value);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setWidth(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Ruler className="h-5 w-5 text-blue-600" />
          Measure Property
        </CardTitle>
        <div className="text-sm text-gray-600 truncate" title={address}>
          {address}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="length" className="text-sm font-medium">
              Length (ft)
            </Label>
            <Input
              id="length"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={length}
              onChange={handleLengthChange}
              onKeyDown={handleKeyPress}
              className="text-center"
              disabled={isCalculating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width" className="text-sm font-medium">
              Width (ft)
            </Label>
            <Input
              id="width"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={width}
              onChange={handleWidthChange}
              onKeyDown={handleKeyPress}
              className="text-center"
              disabled={isCalculating}
            />
          </div>
        </div>
        
        {area > 0 && (
          <div className="bg-white p-3 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Calculated Area</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {area.toLocaleString()} sq ft
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {length} × {width} feet
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSave} 
            disabled={!length || !width || isCalculating}
            className="flex-1"
            size="sm"
          >
            {isCalculating ? (
              <>
                <Calculator className="h-4 w-4 mr-2 animate-pulse" />
                Calculating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isCalculating}
            size="sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-xs text-gray-500">
          <div className="mb-1">Tips:</div>
          <ul className="space-y-0.5">
            <li>• Enter measurements in feet</li>
            <li>• Use decimal points for precision</li>
            <li>• Press Enter to save quickly</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};