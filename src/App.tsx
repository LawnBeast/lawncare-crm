import React, { Suspense } from 'react';
import { CRMApp } from './components/CRMApp';
import { Toaster } from './components/ui/toaster';
import { Card, CardContent } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';
import './App.css';

// Loading fallback component
const AppLoading = () => (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="max-w-7xl mx-auto">
      <Card className="mb-6">
        <CardContent className="p-6">
          <Skeleton className="h-8 w-64" />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<AppLoading />}>
        <CRMApp />
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;