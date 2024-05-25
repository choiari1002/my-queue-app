import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CookieOptions, createServerClient } from "@supabase/ssr";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.log(error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.log(error);
          }
        },
      },
    },
  );

  const code = req.nextUrl.searchParams.get("code");
  console.log("코드야 어딨니?");
  console.log(code);
  console.log("여기요..");

  if (code) {
    console.log("11111");
    // 아래에 session이 없을 수도 있다. 데스크탑으로 메일 보내고, 폰으로 이메일 확인하거나 그럴 때..
    // 리셋 패스워드는 근데 중요하다
    // 로그인 된 유저는 자기 패스워드 바꿀 수 있다. 근데 패스워드 모르면.. 이메일 인증하면
    // 패스워드는 모르지만 로그인은 해줄게.. 하며 해준거.. 그리고 업데이트 패스워드 콜을 해주면 패스워드가 바뀌는 거
    // const {data: {session}} = await supabase.auth.exchangeCodeForSession(code);
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (e) {}
  }

  return NextResponse.redirect(req.nextUrl.origin);
  // 후..
  // return NextResponse.redirect("http://localhost:3000/auth/reset-password");
}
