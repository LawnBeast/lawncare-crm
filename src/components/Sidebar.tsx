import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Settings,
  Snowflake,
  X
} from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'snow-plowing', label: 'Snow Plowing', icon: Snowflake },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-orange-900 to-orange-800 text-white transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:z-auto"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-orange-700">
          <Logo size="md" className="text-white" />
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden text-white hover:bg-orange-700"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left",
                  activeTab === item.id 
                    ? "bg-gradient-to-r from-orange-600 to-yellow-600 text-white" 
                    : "text-orange-300 hover:text-white hover:bg-orange-700"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;