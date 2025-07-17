import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Terminal, Globe, Code, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    id: 1,
    title: "Install Node.js",
    description: "Download and install Node.js 18+ from nodejs.org",
    icon: Globe,
    command: "node --version",
    verify: "Should show v18.0.0 or higher"
  },
  {
    id: 2,
    title: "Install Dependencies",
    description: "Run npm install to download all packages",
    icon: Terminal,
    command: "npm install",
    verify: "Creates node_modules folder"
  },
  {
    id: 3,
    title: "Start Development Server",
    description: "Launch the local development server",
    icon: Code,
    command: "npm run dev",
    verify: "Shows localhost:5173 URL"
  },
  {
    id: 4,
    title: "Open in Browser",
    description: "View your CRM application",
    icon: Rocket,
    command: "http://localhost:5173",
    verify: "CRM interface loads successfully"
  }
];

export const SetupWizard = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const toggleStep = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Setup Wizard</h1>
        <p className="text-muted-foreground">Get your CRM running in 4 simple steps</p>
        <Badge variant="outline" className="mt-2">
          Step {currentStep} of {steps.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = currentStep === step.id;
                const Icon = step.icon;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      isCurrent ? 'bg-blue-50 border-blue-200' : ''
                    } ${
                      isCompleted ? 'bg-green-50 border-green-200' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="flex-shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <Icon className={`h-4 w-4 ${
                      isCompleted ? 'text-green-600' : 
                      isCurrent ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <div className={`font-medium ${
                        isCompleted ? 'text-green-700' : 
                        isCurrent ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {steps[currentStep - 1].description}
              </p>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-sm font-medium mb-2">Command to run:</div>
                <code className="bg-black text-green-400 px-3 py-2 rounded block font-mono text-sm">
                  {steps[currentStep - 1].command}
                </code>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm font-medium mb-2 text-blue-800">Expected result:</div>
                <p className="text-sm text-blue-700">
                  {steps[currentStep - 1].verify}
                </p>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={currentStep === steps.length}
                >
                  Next Step
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toggleStep(currentStep)}
                >
                  {completedSteps.includes(currentStep) ? 'Mark Incomplete' : 'Mark Complete'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reference */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Essential Commands</h4>
              <div className="space-y-1 text-sm">
                <div><code className="bg-gray-100 px-2 py-1 rounded">npm install</code> - Install dependencies</div>
                <div><code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code> - Start development server</div>
                <div><code className="bg-gray-100 px-2 py-1 rounded">npm run build</code> - Build for production</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Troubleshooting</h4>
              <div className="space-y-1 text-sm">
                <div>• Port busy? Use <code className="bg-gray-100 px-1 rounded">--port 3000</code></div>
                <div>• Install fails? Clear cache first</div>
                <div>• Blank page? Check terminal for errors</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {completedSteps.length === steps.length && (
        <Card className="mt-6 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Setup Complete!</h3>
              <p className="text-green-700 mb-4">
                Your Sunrise Maintenance CRM is now running successfully.
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Start Using Your CRM
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};