import { NextRequest, NextResponse } from "next/server";

// 이렇게 써도 다이나믹
// export const dynamic = "force-dynamic";

export async function POST(req:NextRequest) {
    // 리퀘스트 바디를 썼다 => 빌드시 다이나믹이 된다. (람다 심볼) 얘는 내가 캐싱을 할 수 없다..
    const body = await req.json();
    console.log(body);
    return NextResponse.json(true);
}

// 일단 넥스트js는 서버사이드다. 기본적으로. 그치만 이벤트를 붙이거나 할 때 내가 클라이언트로 바꿔줘야해.
// 그러더라도 첫 한번은(이니셜 값은) 서버 랜더링을 한다?
// next는 최대한 static하게 만드려고 한다. = 특정 조건에 맞아야지만 다이나믹하게 인정을 해준다.
// 퍼포먼스를 생각한다면.. 어떻게 static으로 할 수 있을지 생각해야한다.