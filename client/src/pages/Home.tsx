import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasswordChecker from "@/components/PasswordChecker";
import BatchChecker from "@/components/BatchChecker";
import SecurityInfo from "@/components/SecurityInfo";

export default function Home() {
  const [activeTab, setActiveTab] = useState("single");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground" data-testid="text-hero-title">
          Check Password Security
        </h1>
        <p className="text-lg text-muted-foreground" data-testid="text-hero-description">
          Instantly verify if your passwords have been compromised in data breaches. 
          Powered by HaveIBeenPwned with complete privacy protection.
        </p>
      </div>

      {/* Main Checker Interface */}
      <div className="w-full">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
          data-testid="tabs-checker"
        >
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="single" data-testid="tab-single">
              Single Check
            </TabsTrigger>
            <TabsTrigger value="batch" data-testid="tab-batch">
              Batch Check
            </TabsTrigger>
            <TabsTrigger value="info" data-testid="tab-info">
              Security Info
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="mt-8">
            <PasswordChecker />
          </TabsContent>
          
          <TabsContent value="batch" className="mt-8">
            <BatchChecker />
          </TabsContent>
          
          <TabsContent value="info" className="mt-8">
            <SecurityInfo />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer Information */}
      <div className="text-center space-y-2 pt-8 border-t">
        <p className="text-sm text-muted-foreground" data-testid="text-footer">
          This tool uses the k-anonymity model to protect your privacy. 
          Your passwords are never transmitted or stored.
        </p>
        <p className="text-xs text-muted-foreground">
          Powered by HaveIBeenPwned API
        </p>
      </div>
    </div>
  );
}