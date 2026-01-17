// In-memory admin settings storage
let adminSettings = {
  notifications: {
    email: true,
    push: false,
    sms: false,
  },
  security: {
    twoFactor: false,
    sessionTimeout: 30,
  },
  preferences: {
    language: 'en',
    timezone: 'UTC',
  },
  updatedAt: new Date().toISOString(),
};

export function getAdminSettings() {
  return { ...adminSettings };
}

export function updateAdminSettings(updates: Partial<typeof adminSettings>) {
  adminSettings = {
    ...adminSettings,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return { ...adminSettings };
}


