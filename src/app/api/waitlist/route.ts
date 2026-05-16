import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const apiUrl = process.env.API_URL;
    
    if (!apiUrl) {
      console.error("Missing API_URL environment variable");
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    const body = await req.json();
    const backendRes = await fetch(`${apiUrl}/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const contentType = backendRes.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await backendRes.json();
      return NextResponse.json(data, { status: backendRes.status });
    } else {
      const text = await backendRes.text();
      return NextResponse.json({ message: "Backend error", detail: text }, { status: backendRes.status });
    }
  } catch (error) {
    return NextResponse.json({ message: "Connection failed" }, { status: 500 });
  }
}