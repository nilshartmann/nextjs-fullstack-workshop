"use server";

import { auth, refreshToken } from "@/auth";
import { currentDate } from "./current-date";
import { getSessionToken } from "@/app/components/auth/get-session-token.ts";
import { recipifyBackendUrl } from "@/app/components/recipify-backend-url.ts";
import { getAuthHeader } from "@/app/components/auth/get-auth-header.ts";

export async function ping() {
  const session = await auth();
  const authHeader = await getAuthHeader();
  const userInfoUrl = process.env.KEYCLOAK_USERINFO_URL;
  if (!userInfoUrl) {
    throw new Error("No KEYCLOAK_USERINFO_URL found in process.env");
  }

  console.log("PING", currentDate(), session);

  if (authHeader) {
    const response = await fetch(userInfoUrl, {
      method: "GET",
      headers: {
        // add the token you received to the userinfo request, sent to keycloak
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
    });

    console.log("Response from keycloak", response.status, response.statusText);
    if (response.ok) {
      const userinfo = await response.json();
      return `User-Info from Keycloak: ${JSON.stringify(userinfo)}`;
    } else {
      return `Status Code from Keycloak Request: ${response.status} ${response.statusText}`;
    }
  } else {
    return "No authToken in token found - no request to keycloak!";
  }
}

export async function getHello() {
  const url = recipifyBackendUrl("/api/ping/hello");
  console.log("Get Hello from", url);
  const authHeader = await getAuthHeader();
  const headers = new Headers();
  if (authHeader) {
    headers.append("Authorization", authHeader);
  }
  const response = await fetch(url, {
    headers,
  });
  if (response.ok) {
    const body = await response.text();
    return `Result from Spring Service: ${body}`;
  }

  return `Calling Spring Service failed: ${response.status} ${response.statusText}`;
}

export async function getMoney() {
  const url = recipifyBackendUrl("/api/ping/money");
  const authHeader = await getAuthHeader();
  console.log("Get Money from", url);
  const headers = new Headers();
  if (authHeader) {
    headers.append("Authorization", authHeader);
  }
  const response = await fetch(url, {
    headers,
  });

  if (response.ok) {
    const body = await response.text();
    return `Result from Spring Service: ${body}`;
  }

  return `Calling Spring Service failed: ${response.status} ${response.statusText}`;
}

export async function forceRefreshToken() {
  const token = await getSessionToken();
  if (!token) {
    return "getSessionToken returned null";
  }
  const result = await refreshToken(token);
  console.log("REFRESHED TOKEN", result);
  return "token refreshed";
}
