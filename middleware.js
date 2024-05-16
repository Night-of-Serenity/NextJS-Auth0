// middleware.js
import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const user = await getSession(req, res);
  console.log({ user });
  if (!user) {
    return NextResponse.redirect("/api/auth/login");
  }

  const userPermissionData = jwtDecode(user.accessToken);
  console.log("userPermissionData:", userPermissionData);

  return res;
});

export const config = {
  matcher: "/profile",
};
