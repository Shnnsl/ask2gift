import { NextResponse } from "next/server";

/**
 * Daily keep-alive for the Supabase free plan, which pauses projects after
 * 7 days without activity. Vercel calls this route once a day (see vercel.json).
 *
 * It makes one small read request to the feedback table. Visitors are only
 * allowed to add feedback, not read it, so Supabase answers "permission
 * denied". That is expected: the request still reaches the database, which
 * counts as activity, and nothing is read or written.
 */
export const dynamic = "force-dynamic";

const TIMEOUT_MS = 10_000;

export async function GET(request: Request) {
  // When CRON_SECRET is set in Vercel, Vercel sends it with every scheduled call,
  // and anyone else calling this address is turned away.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: false, error: "Supabase is not configured" }, { status: 500 });
  }

  const checkedAt = new Date().toISOString();

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/recommendation_feedback?select=id&limit=1`, {
      headers: { apikey: supabaseKey },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });

    // Any answer below 500 means the database is up and received the request.
    const reachable = response.status < 500;

    return NextResponse.json(
      { ok: reachable, supabaseStatus: response.status, checkedAt },
      { status: reachable ? 200 : 502 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Request failed", checkedAt },
      { status: 502 }
    );
  }
}
