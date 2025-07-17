import { QuickSetup } from "@/components/QuickSetup";
import { SetupWizard } from "@/components/SetupWizard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Setup = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to CRM
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Setup & Installation Guide</h1>
        <p className="text-muted-foreground">Get your CRM running locally</p>
      </div>
      
      <div className="container mx-auto py-8">
        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick">Quick Setup</TabsTrigger>
            <TabsTrigger value="wizard">Step-by-Step Wizard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick">
            <QuickSetup />
          </TabsContent>
          
          <TabsContent value="wizard">
            <SetupWizard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Setup;