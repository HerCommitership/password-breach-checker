import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ShieldAlert, ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CheckResult {
  password: string;
  isBreached: boolean;
  breachCount: number;
  error?: string;
}

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleCheck = async () => {
    if (!password.trim()) {
      setResult({
        password: "",
        isBreached: false,
        breachCount: 0,
        error: "Please enter a password to check"
      });
      return;
    }

    setIsChecking(true);
    console.log("Checking password breach status...");
    
    try {
      const response = await fetch('/api/check-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check password');
      }

      setResult({
        password: "••••••••", // Never show actual password
        isBreached: data.isBreached,
        breachCount: data.breachCount,
        error: data.error
      });
      
      console.log("Password check completed", { isBreached: data.isBreached, breachCount: data.breachCount });
    } catch (error: any) {
      console.error("Password check failed:", error);
      setResult({
        password: "••••••••",
        isBreached: false,
        breachCount: 0,
        error: error.message || "Failed to check password. Please try again."
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleClear = () => {
    setPassword("");
    setResult(null);
    setShowPassword(false);
    console.log("Password checker cleared");
  };

  const getStatusIcon = () => {
    if (!result) return <Shield className="h-6 w-6 text-muted-foreground" />;
    if (result.error) return <ShieldAlert className="h-6 w-6 text-warning" />;
    return result.isBreached 
      ? <ShieldAlert className="h-6 w-6 text-destructive" />
      : <ShieldCheck className="h-6 w-6 text-success" />;
  };

  const getStatusMessage = () => {
    if (!result) return null;
    if (result.error) return result.error;
    
    if (result.isBreached) {
      return `This password has been found in ${result.breachCount.toLocaleString()} data breaches. Consider changing it immediately.`;
    } else {
      return "Great! This password hasn't been found in any known data breaches.";
    }
  };

  const getStatusColor = () => {
    if (!result) return "secondary";
    if (result.error) return "secondary";
    return result.isBreached ? "destructive" : "secondary";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="text-card-title">
          <Shield className="h-5 w-5 text-primary" />
          Check Password Security
        </CardTitle>
        <CardDescription data-testid="text-card-description">
          Enter a password to check if it has been compromised in known data breaches.
          Your password is never stored or logged.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password to check"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 font-mono"
              data-testid="input-password"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isChecking) {
                  handleCheck();
                }
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setShowPassword(!showPassword)}
              data-testid="button-toggle-visibility"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleCheck}
              disabled={isChecking || !password.trim()}
              className="flex-1"
              data-testid="button-check-password"
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Check Password"
              )}
            </Button>
            
            {(password || result) && (
              <Button
                variant="outline"
                onClick={handleClear}
                data-testid="button-clear"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {result && (
          <Card className={`border-2 ${result.isBreached && !result.error ? 'border-destructive/20 bg-destructive/5' : result.error ? 'border-warning/20 bg-warning/5' : 'border-success/20 bg-success/5'}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                {getStatusIcon()}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold" data-testid="text-status-title">
                      {result.error ? "Validation Error" : 
                       result.isBreached ? "Password Compromised" : "Password Secure"}
                    </h3>
                    {result.isBreached && !result.error && (
                      <Badge variant="destructive" data-testid="badge-breach-count">
                        {result.breachCount.toLocaleString()} breaches
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground" data-testid="text-status-message">
                    {getStatusMessage()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}