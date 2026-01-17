// Simple in-memory session storage
const sessions = new Map<string, { timestamp: number }>();

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function validateAdmin(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createSession(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  // Encode timestamp in token for middleware validation
  const token = `admin_${timestamp}_${random}`;
  sessions.set(token, { timestamp });
  
  // Clean up expired sessions
  cleanupExpiredSessions();
  
  return token;
}

export function validateSession(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // First, try to validate from in-memory storage (for API routes)
  const session = sessions.get(token);
  if (session) {
    // Check if session expired
    const now = Date.now();
    if (now - session.timestamp > SESSION_DURATION) {
      sessions.delete(token);
      return false;
    }
    
    // Update last activity
    session.timestamp = now;
    return true;
  }
  
  // Fallback: validate token format and expiration from token itself
  // This works in middleware (Edge Runtime) where sessions Map isn't available
  if (token.startsWith('admin_')) {
    const parts = token.split('_');
    if (parts.length >= 2) {
      const timestamp = parseInt(parts[1], 10);
      if (!isNaN(timestamp)) {
        const now = Date.now();
        // Check if token is not expired (within SESSION_DURATION)
        if (now - timestamp <= SESSION_DURATION) {
          return true;
        }
      }
    }
  }
  
  return false;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}

function cleanupExpiredSessions(): void {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now - session.timestamp > SESSION_DURATION) {
      sessions.delete(token);
    }
  }
}

