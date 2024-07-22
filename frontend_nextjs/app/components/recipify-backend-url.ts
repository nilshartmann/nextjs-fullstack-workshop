const _recipifyBackendUrl =
  process.env.RECIPIFY_BACKEND ?? "http://localhost:8080";
console.log("Recipify Backend", _recipifyBackendUrl);

export function recipifyBackendUrl(p?: string) {
  if (!p) {
    return _recipifyBackendUrl;
  }
  return `${_recipifyBackendUrl}${p}`;
}
