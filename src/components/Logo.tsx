import React from 'react';
import { Building2, Sunrise } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg p-1.5 shadow-lg">
          <Sunrise className={`${sizeClasses[size]} text-white`} />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent`}>
            SunriseCRM
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-gray-500 -mt-1">
              Business Management
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;