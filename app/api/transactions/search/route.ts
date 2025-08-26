// import { NextResponse } from "next/server";
// import { yayaPost } from "@/lib/yaya";

// export async function POST(req: Request) {
//   const body = await req.json(); // { query: "..." }
//   try {
//     const data = await yayaPost("/transaction/search", body);

//     if (data && typeof data === "object" && "data" in data) {
//       const d = data as unknown as Record<string, unknown>;
//       const payload = Array.isArray(d.data) ? (d.data as unknown[]) : [];
//       const status = typeof d.status === "number" ? d.status : 200;
//       return NextResponse.json(payload, { status });
//     }

//     return NextResponse.json(data);
//   } catch (err: unknown) {
//     console.error(err);
//     let message = "Unknown error";
//     if (
//       typeof err === "object" &&
//       err !== null &&
//       "message" in err &&
//       typeof (err as Record<string, unknown>).message === "string"
//     ) {
//       message = (err as Record<string, unknown>).message as string;
//     } else if (typeof err === "string") {
//       message = err;
//     }
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }
