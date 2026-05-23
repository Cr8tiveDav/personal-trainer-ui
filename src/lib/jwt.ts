function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function hasJwtExp(token: string): boolean {
  const payload = decodeJwtPayload(token);
  return typeof payload?.exp === "number";
}

export function getJwtType(token: string): string | undefined {
  const payload = decodeJwtPayload(token);
  const typ = payload?.typ ?? payload?.type;
  return typeof typ === "string" ? typ : undefined;
}

export function isJwtExpired(token: string, bufferMs = 0): boolean {
  const payload = decodeJwtPayload(token);
  if (typeof payload?.exp !== "number") return false;
  return Date.now() >= payload.exp * 1000 - bufferMs;
}
