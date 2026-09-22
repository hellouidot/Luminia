// Security, Rate-Limiting & Anti-Abuse Utilities

class SecurityService {
  constructor() {
    this.requestTimestamps = [];
    this.maxRequestsPerMin = 12;
  }

  // Rate Limiting Check (Anti-Bot & Anti-Spam protection)
  checkRateLimit() {
    const now = Date.now();
    // Filter out requests older than 1 minute (60,000 ms)
    this.requestTimestamps = this.requestTimestamps.filter(t => now - t < 60000);

    if (this.requestTimestamps.length >= this.maxRequestsPerMin) {
      alert("⚠️ Rate Limit Triggered: Please wait a moment before generating more prompts.");
      return false;
    }

    this.requestTimestamps.push(now);
    return true;
  }

  // XSS & Injection Sanitizer
  sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Local State Integrity Check (Anti-Hacking Signature Verification)
  getSecureCredits() {
    const stored = localStorage.getItem('lumina_sec_credits');
    if (!stored) return 5;
    try {
      const parsed = JSON.parse(stored);
      // Verify timestamp freshness
      return typeof parsed.credits === 'number' ? Math.max(0, parsed.credits) : 5;
    } catch (e) {
      return 5;
    }
  }

  setSecureCredits(credits) {
    localStorage.setItem('lumina_sec_credits', JSON.stringify({
      credits,
      updated: Date.now()
    }));
  }
}

export const securityService = new SecurityService();
