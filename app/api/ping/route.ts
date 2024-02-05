import { NextResponse } from "next/server";
import ping from "ping";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const host = params.get("host") || null;

  if (host === null) {
    return NextResponse.json({ error: "Host is required" }, { status: 400 });
  }

  const result = await ping.promise.probe(host);

  return NextResponse.json(result);
}
