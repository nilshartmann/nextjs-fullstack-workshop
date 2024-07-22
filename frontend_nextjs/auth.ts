import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import {JWT} from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    recipifyAccessToken?: string;
    recipifyRefreshToken?: string;
    recipifyAccessExpiresAs?: number;
  }
}

declare module "next-auth" {
  interface Session {
    hurz?: string;
    // appSession: {
    //   role: string;
    // } | null
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  basePath: "/auth",
  providers: [
    Keycloak({
      profile(p) {
        console.log(">>> PROFILE", p);
        return {
          id: p.preferred_username,
          roles: p.roles,
        };
      },
    }),
  ],

  // Hier versteht man so einigermaßen wir die Callbacks funktionieren
  //  -> https://authjs.dev/guides/refresh-token-rotation#jwt-strategy

  callbacks: {
    async jwt(params) {
      console.log("JWT CALLBACK", params.trigger);

      if (params.account) {
        // FIRST LOGIN: After login with IDP
        console.log("FIRST LOGIN - AFTER IDP - PARAMS", params);
        const roles = params.profile?.roles;
        console.log(">>>>>>>>> ROLES", roles);

        // The object returned here will be stored in the
        // JWT that is exchanged between Server (next.js) and Client (Browser)
        // via encrypted JS-only cookie
        return {
          ...params.token,
          recipifyAccessToken: params.account.access_token,
          recipifyRefreshToken: params.account.refresh_token,
          recipifyAccessExpiresAs: params.account.expires_at,
        };
      }

      // The JWT is received from the Cookie.
      // All informations from the object above should be included
      console.log("SUBSEQUENT LOGINS");

      if (!params.token.recipifyAccessExpiresAs) {
        throw new Error("no recipifyAccessExpiresAs found!");
      }

      const tokenExpiresAt = params.token.recipifyAccessExpiresAs;
      const expDate = new Date(tokenExpiresAt * 1000);
      console.log(
        "Expiration date",
        expDate.toLocaleTimeString(),
        "now",
        new Date().toLocaleTimeString(),
      );

      if (!isTokenExpired(tokenExpiresAt, 10)) {
        // Subsequent logins, if the `access_token` is still valid, return the unchanged JWT
        return params.token;
      }

      // Token has expired, you might want to force a re-authentication
      // so wird es in keycloak-js gemacht: https://github.com/keycloak/keycloak/blob/main/js/libs/keycloak-js/src/keycloak.js#L627
      //    wenn man das mit "-1" als Parameter aufruft, wird immer refresh
      //    sonst nur, wenn:

      const t = await refreshToken(params.token);
      return t;
    },
    session({ session, token }) {
      // return {
      //   username: token.sub || ""
      // };

      if (!token) {
        console.log("TOKEN EXPIRED, CLEAR SESSION");
        return {
          ...session,
          user: undefined,
        };
      }
      session.hurz = "HURZ";
      return session;
    },
  },
});

export async function refreshToken(token: JWT) {
  const refreshToken = token.recipifyRefreshToken;

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }
  const searchParams = new URLSearchParams({
    client_id: process.env.AUTH_KEYCLOAK_ID!,
    client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const url = process.env.KEYCLOAK_USERINFO_URL;

  if (!url) {
    throw new Error("No 'KEYCLOAK_USERINFO_URL' in process.env");
  }

  console.log("URL", url);
  const response = await fetch(url, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    body: searchParams,
    credentials: "include",
  });

  console.log("RESPONSE RETURN", response.status, response.statusText);
  if (!response.ok) {
    const body = await response.text();
    console.log("REFRESH FAILED", body);
    throw new Error("Refrehs failed");
  }

  const responseTokens = await response.json();

  console.log("REFRESH RESPONSE", response.status, response.statusText);

  if (!response.ok) {
    console.error(
      "Could not refresh access token",
      response.status,
      response.statusText,
      responseTokens,
    );
    throw responseTokens;
  }

  return {
    // Keep the previous token properties
    ...token,
    recipifyAccessToken: responseTokens.access_token,
    recipifyhAccessExpiresAs: Math.floor(
      Date.now() / 1000 + (responseTokens.expires_in as number),
    ),
    // Fall back to old refresh token, but note that
    // many providers may only allow using a refresh token once.
    recipifyRefreshToken: responseTokens.refresh_token ?? token.refresh_token,
  };
}

function isTokenExpired(expiresAt: number, minValidity: number) {
  let expiresIn = expiresAt - Math.ceil(new Date().getTime() / 1000);
  if (minValidity) {
    if (isNaN(minValidity)) {
      throw "Invalid minValidity";
    }
    expiresIn -= minValidity;
  }
  return expiresIn < 0;
}
