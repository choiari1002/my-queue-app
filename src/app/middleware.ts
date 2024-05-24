// import { NextResponse, type NextRequest } from "next/server";
// import { updateSession } from "@/utils/supabase/middleware";
// import { makeMiddlewareClient } from "@/utils/supabaseServerClient.utils";

// export async function middleware(request: NextRequest) {
//   const { response, supabase } = makeMiddlewareClient(request);

//   const { pathname: requestPath, searchParams: URLSearchParams } =
//     request.nextUrl;

//   // // Locale setting is not important for API
//   // let locale = request.cookies.get("locale")?.value;

//   // if (!locale || !LOCALE_LIST.find((x) => x.code === locale)) {
//   //   locale = DEFAULT_LOCALE.code;
//   //   response.cookies.set("locale", locale, { maxAge: 30 * 24 * 3600, path: "/" });
//   // }

//   // proceed if heading to auth-related page
//   if (requestPath.startsWith(`/${AUTH_PATH_PREFIX}`)) return response;

//   const user = await supabase.auth.getUser().then(({ data }) => data.user);
//   const sendToAuth = () =>
//     NextResponse.redirect(new URL(PATH.AUTH_CHOICE, request.url));

//   if (user) {
//     // 나는 아직 getUserType 부분 없어..
//     const { userType, storeId } = await getUserType(supabase, user);

//     if (!storeId) {
//       // user is authenticated, but does not have an administrating store
//       await supabase.auth.signOut({ scope: "global" });
//       return sendToAuth();
//     }

//     if (userType === "admin") {
//       //authenticated user is an admin
//       const pathPrefix = PATH.STORE_ADMIN_DASHBOARD(storeId);
//       if (!requestPath.startsWith(pathPrefix)) {
//         // current destination is not within admin portal
//         return NextResponse.redirect(new URL(pathPrefix, request.url));
//       }
//     // } else if (userType === "device") {
//     //   //authenticated user is a device
//     //   const pathPrefix = PATH.STORE_DEVICE_DASHBOARD(storeId);
//     //   if (!requestPath.startsWith(pathPrefix)) {
//     //     // current destination is not within device portal
//     //     return NextResponse.redirect(new URL(pathPrefix, request.url));
//     //   }
//     // }
//     else {
//       // userType is not recognized
//       return sendToAuth();
//     }
//   } else {
//     //redirect to auth page when an anonymous request is not designated to an auth-related page
//     return sendToAuth();
//   }
//   return response;
// }

// // export async function middleware(request: NextRequest) {
// //   return await updateSession(request)
// // }
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:txt|xml|js|css|ico|svg|png|jpg|jpeg|gif|webp|json)$).*)",
//   ],
// };
