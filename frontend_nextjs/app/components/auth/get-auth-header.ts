import { getSessionToken } from "@/app/components/auth/get-session-token.ts";

export async function getAuthHeader() {
  const token = await getSessionToken();
  if (token?.recipifyAccessToken) {
    const authHeader = `Bearer ${token.recipifyAccessToken}`;
    console.log(
      "RecipifyAccessToken is set -> calling external service with header",
      authHeader,
    );
    return authHeader;
  }
  return null;
}
