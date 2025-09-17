import crypto from 'crypto';

export interface PasswordCheckResult {
  isBreached: boolean;
  breachCount: number;
  error?: string;
}

export class PasswordService {
  private static readonly PWNED_API_URL = 'https://api.pwnedpasswords.com/range/';
  private static readonly REQUEST_TIMEOUT = 10000; // 10 seconds

  /**
   * Check if a password has been breached using k-anonymity model
   * Only the first 5 characters of the SHA-1 hash are sent to the API
   */
  static async checkPassword(password: string): Promise<PasswordCheckResult> {
    try {
      // Input validation
      if (!password || password.trim().length === 0) {
        return {
          isBreached: false,
          breachCount: 0,
          error: 'Password is required'
        };
      }

      // Create SHA-1 hash
      const sha1Hash = crypto.createHash('sha1')
        .update(password, 'utf8')
        .digest('hex')
        .toUpperCase();

      // Split hash for k-anonymity (first 5 chars sent, rest used locally)
      const hashPrefix = sha1Hash.substring(0, 5);
      const hashSuffix = sha1Hash.substring(5);

      // Make API request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

      try {
        const response = await fetch(`${this.PWNED_API_URL}${hashPrefix}`, {
          method: 'GET',
          headers: {
            'User-Agent': 'Password-Breach-Checker-1.0',
            'Add-Padding': 'true'
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.status === 429) {
          return {
            isBreached: false,
            breachCount: 0,
            error: 'Rate limit exceeded. Please wait a moment and try again.'
          };
        }

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const responseText = await response.text();
        
        // Parse response and find matching hash suffix
        const breachCount = this.parseApiResponse(responseText, hashSuffix);
        
        return {
          isBreached: breachCount > 0,
          breachCount
        };

      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          return {
            isBreached: false,
            breachCount: 0,
            error: 'Request timed out. Please try again.'
          };
        }
        
        throw fetchError;
      }

    } catch (error: any) {
      console.error('Password check error:', error.message);
      
      return {
        isBreached: false,
        breachCount: 0,
        error: 'Unable to check password. Please try again later.'
      };
    }
  }

  /**
   * Parse the API response to find breach count for specific hash suffix
   */
  private static parseApiResponse(responseText: string, hashSuffix: string): number {
    const lines = responseText.split('\n');
    
    for (const line of lines) {
      const [suffix, count] = line.split(':');
      if (suffix && suffix.trim() === hashSuffix) {
        return parseInt(count.trim(), 10) || 0;
      }
    }
    
    return 0; // Not found in breaches
  }

  /**
   * Check multiple passwords in batch with rate limiting
   */
  static async checkPasswordsBatch(passwords: string[]): Promise<PasswordCheckResult[]> {
    if (passwords.length > 10) {
      throw new Error('Batch size limited to 10 passwords');
    }

    const results: PasswordCheckResult[] = [];
    
    // Process with delays to respect rate limiting
    for (let i = 0; i < passwords.length; i++) {
      const result = await this.checkPassword(passwords[i]);
      results.push(result);
      
      // Add delay between requests (except for last one)
      if (i < passwords.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return results;
  }
}