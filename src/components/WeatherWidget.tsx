import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Thermometer, Droplets } from 'lucide-react';

interface WeatherData {
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    snowfall: number;
    precipitation: number;
  }>;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    current: {
      temp: 28,
      condition: 'Snow',
      humidity: 85,
      windSpeed: 12,
      precipitation: 0.8
    },
    forecast: [
      { day: 'Today', high: 32, low: 24, condition: 'Snow', snowfall: 3.2, precipitation: 0.8 },
      { day: 'Tomorrow', high: 29, low: 18, condition: 'Heavy Snow', snowfall: 5.1, precipitation: 0.9 },
      { day: 'Wed', high: 35, low: 22, condition: 'Light Snow', snowfall: 1.5, precipitation: 0.4 },
      { day: 'Thu', high: 38, low: 28, condition: 'Cloudy', snowfall: 0, precipitation: 0.1 },
      { day: 'Fri', high: 42, low: 31, condition: 'Partly Cloudy', snowfall: 0, precipitation: 0 }
    ]
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'snow':
      case 'heavy snow':
      case 'light snow':
        return <CloudSnow className="w-6 h-6 text-blue-400" />;
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-600" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'partly cloudy':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getSnowfallColor = (amount: number) => {
    if (amount >= 4) return 'bg-red-100 text-red-800';
    if (amount >= 2) return 'bg-orange-100 text-orange-800';
    if (amount > 0) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CloudSnow className="w-5 h-5 mr-2 text-blue-600" />
          Weather & Snow Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {getWeatherIcon(weather.current.condition)}
              <span className="ml-2 text-lg font-semibold">{weather.current.condition}</span>
            </div>
            <span className="text-2xl font-bold">{weather.current.temp}°F</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center">
              <Droplets className="w-4 h-4 mr-1 text-blue-500" />
              {weather.current.humidity}%
            </div>
            <div className="flex items-center">
              <Wind className="w-4 h-4 mr-1 text-gray-500" />
              {weather.current.windSpeed} mph
            </div>
            <div className="flex items-center">
              <CloudRain className="w-4 h-4 mr-1 text-blue-600" />
              {weather.current.precipitation}" precip
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700">5-Day Forecast</h4>
          {weather.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <span className="w-12 text-sm font-medium">{day.day}</span>
                {getWeatherIcon(day.condition)}
                <span className="text-sm">{day.condition}</span>
              </div>
              <div className="flex items-center space-x-2">
                {day.snowfall > 0 && (
                  <Badge className={getSnowfallColor(day.snowfall)}>
                    {day.snowfall}" snow
                  </Badge>
                )}
                <span className="text-sm font-medium">
                  {day.high}°/{day.low}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;