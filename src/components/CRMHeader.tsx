import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Menu, Search, User, Settings } from 'lucide-react';
import Logo from './Logo';
import { SignInOutButton } from './SignInOutButton';

interface CRMHeaderProps {
  onMenuClick: () => void;
  activeSection: string;
  user: any;
  onSignOut: () => void;
}

export const CRMHeader: React.FC<CRMHeaderProps> = ({ 
  onMenuClick, 
  activeSection, 
  user, 
  onSignOut 
}) => {
  const getPageTitle = (section: string) => {
    switch (section) {
      case 'dashboard': return 'Dashboard';
      case 'companies': return 'Companies';
      case 'contacts': return 'Contacts';
      case 'deals': return 'Deals';
      case 'invoices': return 'Invoices';
      case 'employees': return 'Employees';
      case 'measurements': return 'Measurements';
      case 'satellite-map': return 'Satellite Map';
      case 'property-pins': return 'Property Pins';
      case 'subscriptions': return 'Subscription Plans';
      case 'settings': return 'Settings';
      case 'help': return 'Help & Support';
      case 'ai-phone': return 'AI Phone Service';
      default: return 'Getting Started';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <Logo size="sm" showText={false} className="lg:hidden" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                {getPageTitle(activeSection)}
              </h1>
              <p className="text-sm text-gray-500">Sunrise Maintenance CRM</p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.id?.includes('offline') ? 'Offline Mode' : 'Online'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <div className="w-full">
                    <SignInOutButton user={user} onSignOut={onSignOut} />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Sign in button when not authenticated */}
          {!user && (
            <SignInOutButton user={user} onSignOut={onSignOut} />
          )}
        </div>
      </div>
    </header>
  );
};