import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { auth } from "@/auth"
import ROUTES from "@/constants/routes"

export async function middleware(req: NextRequest) {
  const session = await auth()

  // If the user is not logged in and is trying to access a protected route
  if (!session) {
    const url = req.nextUrl.clone()
    url.pathname = ROUTES.LOGIN.url
    url.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/performances", "/profile", "/teams"] // 보호된 경로를 여기에 추가
}
