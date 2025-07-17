import { useState } from "react";
import { CRMSidebar } from "./CRMSidebar";
import { CRMHeader } from "./CRMHeader";
import { CRMDashboard } from "./CRMDashboard";
import { AIPhoneDashboard } from "./AIPhoneDashboard";
import { CompanyList } from "./CompanyList";
import { ContactList } from "./ContactList";
import { DealList } from "./DealList";
import { MeasurementsPage } from "./MeasurementsPage";
import { SatelliteMap } from "./SatelliteMap";
import { GettingStarted } from "./GettingStarted";
import { InvoiceManager } from "./InvoiceManager";
import { EmployeeManager } from "./EmployeeManager";
import { CombinedSubscriptionManager } from "./CombinedSubscriptionManager";
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface CRMAppProps {
  user?: any;
  onSignOut?: () => void;
}

export const CRMApp: React.FC<CRMAppProps> = ({ user, onSignOut }) => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('crm_user');
      if (onSignOut) onSignOut();
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      });
    } catch (error) {
      console.warn('Sign out error:', error);
      localStorage.removeItem('crm_user');
      if (onSignOut) onSignOut();
      toast({
        title: 'Signed out',
        description: 'Signed out in offline mode',
      });
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "getting-started":
        return <GettingStarted onNavigate={setActiveSection} />;
      case "dashboard":
        return <CRMDashboard />;
      case "ai-phone":
        return <AIPhoneDashboard />;
      case "companies":
        return <CompanyList />;
      case "contacts":
        return <ContactList />;
      case "deals":
        return <DealList />;
      case "invoices":
        return <InvoiceManager />;
      case "employees":
        return <EmployeeManager />;
      case "measurements":
        return <MeasurementsPage />;
      case "satellite-map":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Satellite Measurement Tool</h1>
            <SatelliteMap />
          </div>
        );
      case "property-pins":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Property Pins</h1>
            <p className="text-gray-600 mb-6">Manage property location pins and measurements.</p>
            <SatelliteMap />
          </div>
        );
      case "subscriptions":
        return <CombinedSubscriptionManager />;
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Sunrise Maintenance Settings</h1>
            <p>Configure your business settings here.</p>
          </div>
        );
      case "help":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Help & Support</h1>
            <p>Contact Sunrise Maintenance support team for assistance.</p>
          </div>
        );
      default:
        return <GettingStarted onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CRMSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CRMHeader 
          onMenuClick={() => setSidebarOpen(true)}
          activeSection={activeSection}
          user={user}
          onSignOut={handleSignOut}
        />
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};