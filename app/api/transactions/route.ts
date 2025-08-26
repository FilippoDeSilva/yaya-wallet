import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { signYayaRequest } from "@/lib/yaya";

const YAYA_BASE = "https://sandbox.yayawallet.com";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const p = url.searchParams.get("p") || "1";
  const q = url.searchParams.get("q") || "";
  const perPage = url.searchParams.get("perPage") || "20";

  const path = "/api/en/transaction/search";
  const method = "POST";

  // Build body according to search type
  let bodyObj: any = { page: Number(p), per_page: Number(perPage) };
  if (q) {
    // If looks like transaction id (long alphanumeric), search by transaction_id
    if (/^[a-zA-Z0-9-]{8,}$/.test(q)) {
      bodyObj.transaction_id = q;
    } else {
      // otherwise fallback to general query (matches sender, receiver, cause)
      bodyObj.query = q;
    }
  }

  const bodyString = JSON.stringify(bodyObj);

  const apiKey = process.env.YAYA_API_KEY;
  const apiSecret = process.env.YAYA_API_SECRET;

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Server is not configured with YAYA API keys." },
      { status: 500 }
    );
  }

  const timestamp = Date.now().toString();

  const signature = signYayaRequest({
    apiSecret,
    timestamp,
    method,
    endpointPath: path,
    bodyString,
  });

  const headers: any = {
    "Content-Type": "application/json",
    "YAYA-API-KEY": apiKey,
    "YAYA-API-TIMESTAMP": timestamp,
    "YAYA-API-SIGN": signature,
  };

  try {
    const resp = await fetch(`${YAYA_BASE}${path}`, {
      method,
      headers,
      body: bodyString,
    });

    const raw = await resp.text();
    console.log("YaYa raw response:", raw); // 👈 Debug exact shape

    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { raw };
    }

    return NextResponse.json(data, { status: resp.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Upstream request failed", details: String(err) },
      { status: 502 }
    );
  }
}
