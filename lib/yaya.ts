import crypto from "crypto";

export function signYayaRequest({
  apiSecret,
  timestamp,
  method,
  endpointPath,
  bodyString
}: {
  apiSecret: string;
  timestamp: string; // milliseconds string
  method: string; // e.g. "POST"
  endpointPath: string; // e.g. "/api/en/transaction/search"
  bodyString: string; // JSON string or ""
}) {
  // Pre-hash string: {timestamp+method+endpoint+body}
  const preHash = `${timestamp}${method}${endpointPath}${bodyString}`;
  const hmac = crypto.createHmac("sha256", apiSecret).update(preHash).digest();
  const signatureBase64 = Buffer.from(hmac).toString("base64");
  return signatureBase64;
}
