import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, ShieldAlert, ShieldCheck, Loader2, X } from "lucide-react";

interface BatchResult {
  id: number;
  isBreached: boolean;
  breachCount: number;
  error?: string;
}

export default function BatchChecker() {
  const [passwords, setPasswords] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<BatchResult[]>([]);

  const handleBatchCheck = async () => {
    const passwordList = passwords.split('\n').filter(p => p.trim()).slice(0, 10); // Limit to 10
    if (passwordList.length === 0) return;

    setIsChecking(true);
    setResults([]); // Clear previous results
    console.log(`Checking ${passwordList.length} passwords in batch...`);
    
    try {
      const response = await fetch('/api/check-passwords-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passwords: passwordList }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check passwords');
      }

      // Transform API results to match component interface
      const transformedResults: BatchResult[] = data.results.map((result: any, index: number) => ({
        id: index + 1,
        isBreached: result.isBreached,
        breachCount: result.breachCount,
        error: result.error
      }));

      setResults(transformedResults);
      console.log("Batch check completed", transformedResults);
    } catch (error: any) {
      console.error("Batch password check failed:", error);
      // Show error state
      const errorResults: BatchResult[] = passwordList.map((_, index) => ({
        id: index + 1,
        isBreached: false,
        breachCount: 0,
        error: error.message || "Failed to check password"
      }));
      setResults(errorResults);
    } finally {
      setIsChecking(false);
    }
  };

  const handleClear = () => {
    setPasswords("");
    setResults([]);
    console.log("Batch checker cleared");
  };

  const compromisedCount = results.filter(r => r.isBreached).length;
  const safeCount = results.filter(r => !r.isBreached).length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="text-batch-title">
          <Upload className="h-5 w-5 text-primary" />
          Batch Password Checker
        </CardTitle>
        <CardDescription data-testid="text-batch-description">
          Check multiple passwords at once. Enter one password per line (maximum 10).
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Textarea
            placeholder="Enter passwords here, one per line..."
            value={passwords}
            onChange={(e) => setPasswords(e.target.value)}
            rows={6}
            className="font-mono text-sm"
            data-testid="input-batch-passwords"
          />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              {passwords.split('\n').filter(p => p.trim()).length} passwords entered
            </span>
            <span>Maximum 10 passwords</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleBatchCheck}
            disabled={isChecking || !passwords.trim()}
            className="flex-1"
            data-testid="button-check-batch"
          >
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check All Passwords"
            )}
          </Button>
          
          {(passwords || results.length > 0) && (
            <Button
              variant="outline"
              onClick={handleClear}
              data-testid="button-clear-batch"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex gap-4 text-center">
              <div className="flex-1 p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success" data-testid="text-safe-count">
                  {safeCount}
                </div>
                <div className="text-sm text-muted-foreground">Safe</div>
              </div>
              <div className="flex-1 p-4 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive" data-testid="text-compromised-count">
                  {compromisedCount}
                </div>
                <div className="text-sm text-muted-foreground">Compromised</div>
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Card key={result.id} className={`border ${result.error ? 'border-warning/20 bg-warning/5' : result.isBreached ? 'border-destructive/20 bg-destructive/5' : 'border-success/20 bg-success/5'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {result.error ? (
                          <ShieldAlert className="h-5 w-5 text-warning" />
                        ) : result.isBreached ? (
                          <ShieldAlert className="h-5 w-5 text-destructive" />
                        ) : (
                          <ShieldCheck className="h-5 w-5 text-success" />
                        )}
                        <div>
                          <div className="font-medium" data-testid={`text-password-${result.id}`}>
                            Password #{result.id}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.error 
                              ? result.error
                              : result.isBreached 
                                ? `Found in ${result.breachCount.toLocaleString()} breaches`
                                : "Not found in any breaches"
                            }
                          </div>
                        </div>
                      </div>
                      {result.isBreached && !result.error && (
                        <Badge variant="destructive" data-testid={`badge-breach-${result.id}`}>
                          {result.breachCount.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}