import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

export async function getSessionToken() {
  return await getToken({
    req: {
      headers: headers(),
    },

    secret: process.env.AUTH_SECRET!,
    // hmm....
    salt: "authjs.session-token",
  });
}
