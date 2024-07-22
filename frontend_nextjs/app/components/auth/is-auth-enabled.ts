export function isAuthEnabled() {
  return !!process.env.AUTH_SECRET;
}
