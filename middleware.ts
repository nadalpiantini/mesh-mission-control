import { type NextRequest, NextResponse } from "next/server";

// Empty middleware - no auth, no redirects
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
