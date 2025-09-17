import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database } from "lucide-react";

export default function SecurityInfo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" data-testid="text-security-title">
            <Lock className="h-5 w-5 text-primary" />
            How It Works & Your Privacy
          </CardTitle>
          <CardDescription data-testid="text-security-description">
            Understanding the security behind password breach checking
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <h3 className="font-semibold" data-testid="text-kanonymity-title">k-Anonymity Model</h3>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="text-kanonymity-description">
                Your password is never sent to any server. Only the first 5 characters of your password's 
                SHA-1 hash are sent to check against the HaveIBeenPwned API, protecting your actual password.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <h3 className="font-semibold" data-testid="text-nostore-title">No Storage Policy</h3>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="text-nostore-description">
                Passwords are never logged, stored, or transmitted in plain text. All processing 
                happens locally in your browser for maximum security.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-warning" />
                <h3 className="font-semibold" data-testid="text-data-title">Data Source</h3>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="text-data-description">
                Breach data comes from HaveIBeenPwned, a service that aggregates passwords from 
                real data breaches to help users identify compromised credentials.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-success" />
                <h3 className="font-semibold" data-testid="text-secure-title">Secure Process</h3>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="text-secure-description">
                The entire checking process uses cryptographic hashing and range queries to ensure 
                your password remains private while still checking for breaches.
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2" data-testid="text-recommendation-title">Recommendations</h4>
            <ul className="text-sm text-muted-foreground space-y-1" data-testid="text-recommendations">
              <li>• Use unique, complex passwords for each account</li>
              <li>• Consider using a password manager</li>
              <li>• Enable two-factor authentication where available</li>
              <li>• Change compromised passwords immediately</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}