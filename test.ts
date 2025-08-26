import crypto from "crypto";

const API_BASE = process.env.YAYA_API_BASE || "https://sandbox.yayawallet.com";
const API_KEY = process.env.YAYA_API_KEY!;
const API_SECRET = process.env.YAYA_API_SECRET!; // bare or JWT secret per docs

type PathMode = "full" | "stripped";
type QueryMode = "include" | "exclude";

async function getServerTimestampStrict(): Promise<string> {
  const res = await fetch(`${API_BASE}/api/en/time`);
  const data = await res.json();
  console.debug("[YaYa] /api/en/time payload:", data);

  if (typeof data.time === "number") return String(data.time);
  if (typeof data.timestamp === "number") return String(data.timestamp);
  throw new Error(`Unexpected timestamp format: ${JSON.stringify(data)}`);
}

function sign(prehash: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(prehash).digest("base64");
}

async function testSignatureVariants() {
  const timestamp = await getServerTimestampStrict();
  const method = "GET";
  const endpoint = "/api/en/transaction/find-by-user";
  const query = "?p=1";
  const bodyStr = "";

  const pathVariants: Record<PathMode, string> = {
    full: endpoint,
    stripped: endpoint.replace("/api/en", ""),
  };

  for (const pathMode of Object.keys(pathVariants) as PathMode[]) {
    for (const queryMode of ["include", "exclude"] as QueryMode[]) {
      const pathForSign =
        queryMode === "include"
          ? `${pathVariants[pathMode]}${query}`
          : pathVariants[pathMode];

      const prehash = `${timestamp}${method}${pathForSign}${bodyStr}`;
      const signature = sign(prehash, API_SECRET);

      const headers = {
        "Content-Type": "application/json",
        "YAYA-API-KEY": API_KEY,
        "YAYA-API-TIMESTAMP": timestamp,
        "YAYA-API-SIGN": signature,
      };

      const url = `${API_BASE}${endpoint}${query}`;
      const res = await fetch(url, { method, headers });
      const text = await res.text();

      console.log(`\n[${pathMode} path, ${queryMode} query]`);
      console.log("Prehash:", prehash);
      console.log("Signature:", signature);
      console.log("Response:", res.status, text);
    }
  }
}

testSignatureVariants().catch(console.error);