import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const now = new Date();
  const url = new URL(
    `${req.nextUrl.pathname}/${now.getFullYear()}`,
    req.nextUrl.origin,
  );
  return Response.redirect(url);
}