import React from 'react';
import { TroubleshootingHelper } from '@/components/TroubleshootingHelper';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Troubleshooting = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
      <TroubleshootingHelper />
    </div>
  );
};

export default Troubleshooting;