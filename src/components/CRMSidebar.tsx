import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Users,
  Building2,
  Phone,
  DollarSign,
  FileText,
  UserCheck,
  Ruler,
  Settings,
  HelpCircle,
  CreditCard,
  Satellite,
  MapPin,
  ChevronDown,
  ChevronRight,
  X
} from "lucide-react";

interface CRMSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const CRMSidebar = ({ 
  activeSection, 
  onSectionChange, 
  isOpen = true, 
  onClose 
}: CRMSidebarProps) => {
  const [measurementsExpanded, setMeasurementsExpanded] = useState(false);

  const menuItems = [
    {
      id: "getting-started",
      label: "Getting Started",
      icon: Home,
      badge: "New"
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home
    },
    {
      id: "ai-phone",
      label: "AI Phone Service",
      icon: Phone,
      badge: "AI"
    },
    {
      id: "companies",
      label: "Companies",
      icon: Building2
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: Users
    },
    {
      id: "deals",
      label: "Deals",
      icon: DollarSign
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: FileText
    },
    {
      id: "employees",
      label: "Employees",
      icon: UserCheck
    }
  ];

  const measurementItems = [
    {
      id: "measurements",
      label: "All Measurements",
      icon: Ruler
    },
    {
      id: "satellite-map",
      label: "Satellite Map",
      icon: Satellite,
      badge: "New"
    },
    {
      id: "property-pins",
      label: "Property Pins",
      icon: MapPin
    }
  ];

  const bottomItems = [
    {
      id: "subscriptions",
      label: "Subscription Plans",
      icon: CreditCard
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle
    }
  ];

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed lg:static lg:translate-x-0
        w-64 bg-white border-r border-gray-200 flex flex-col
        h-full z-50 transition-transform duration-300 ease-in-out
      `}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Sunrise CRM</h2>
            <p className="text-sm text-gray-600">Maintenance & Landscaping</p>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleSectionChange(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
            
            <Separator className="my-4" />
            
            {/* Measurements Section */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMeasurementsExpanded(!measurementsExpanded)}
              >
                {measurementsExpanded ? (
                  <ChevronDown className="mr-2 h-4 w-4" />
                ) : (
                  <ChevronRight className="mr-2 h-4 w-4" />
                )}
                <Ruler className="mr-2 h-4 w-4" />
                Measurements
              </Button>
              
              {measurementsExpanded && (
                <div className="ml-4 mt-2 space-y-1">
                  {measurementItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={activeSection === item.id ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleSectionChange(item.id)}
                      >
                        <Icon className="mr-2 h-3 w-3" />
                        {item.label}
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleSectionChange(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};