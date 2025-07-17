import { useState } from 'react';
import { EmployeeForm } from './EmployeeForm';
import { EmployeeList } from './EmployeeList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const EmployeeManager = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEmployeeAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
        <p className="text-gray-600">Manage your team members and their permissions</p>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">All Employees</TabsTrigger>
          <TabsTrigger value="add">Add Employee</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <EmployeeList key={refreshKey} />
        </TabsContent>
        
        <TabsContent value="add" className="space-y-4">
          <EmployeeForm onSuccess={handleEmployeeAdded} />
        </TabsContent>
      </Tabs>
    </div>
  );
};