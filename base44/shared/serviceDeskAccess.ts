// Shared access check for Service Desk endpoints that read Store data
// (Store read RLS is admin-only, so service-role reads require this verification).
export const isAllowedServiceDeskUser = async (base44, user) => {
  if (user?.role === 'admin') return true;
  if (!user?.email) return false;

  const allowedUsers = await base44.asServiceRole.entities.AllowedUser.filter({
    email: user.email.toLowerCase(),
  });

  return allowedUsers.length > 0;
};