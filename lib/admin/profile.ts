// In-memory admin profile storage
let adminProfile = {
  username: 'admin',
  email: 'admin@futurewear.com',
  firstName: '',
  lastName: '',
  bio: '',
  avatar: '',
  updatedAt: new Date().toISOString(),
};

export function getAdminProfile() {
  return { ...adminProfile };
}

export function updateAdminProfile(updates: Partial<typeof adminProfile>) {
  adminProfile = {
    ...adminProfile,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return { ...adminProfile };
}


