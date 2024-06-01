import { NextResponse, NextRequest } from "next/server";
import { makeMiddlewareClient } from "@/utils/supabaseServerClient.utils";
import { createAdmin } from "@/utils/supabase/admin";

export async function middleware(request: NextRequest) {
  const supabaseAdmin = createAdmin();
  const { response, supabase } = makeMiddlewareClient(request);

  const { pathname: requestPath } = request.nextUrl;

  const user = await supabase.auth.getUser().then(({ data }) => data.user);
  const sendToAuth = () =>
    NextResponse.redirect(new URL("/auth/signin", request.url));

  if (user) {
    if (requestPath.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // check username
    const { data: usernameData, error: usernameError } = await supabaseAdmin
      .from("users")
      .select("username")
      .eq("auth_user_id", user.id);

    if (usernameError) {
      console.error("Error fetching username data:", usernameError.message);
      return;
    }

    if (!usernameData.length) {
      return NextResponse.redirect(new URL("/auth/set-username", request.url));
    } else {
      if (requestPath.startsWith("/auth/set-username")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return response;
  } else {
    if (requestPath.startsWith("/auth")) return response;
    return sendToAuth();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:txt|xml|js|css|ico|svg|png|jpg|jpeg|gif|webp|json)$).*)",
  ],
};
