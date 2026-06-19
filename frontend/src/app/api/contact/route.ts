import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

// Render uyandirma + SMTP icin daha uzun sure (Vercel plan limitine tabidir)
export const maxDuration = 60;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, detail: "Invalid JSON" }, { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(55_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[api/contact] backend error:", res.status, detail);
      return NextResponse.json({ ok: false }, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] backend unreachable:", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
