import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const { phone, message } = await req.json();
  console.log(phone, message);

  const result = await client.messages.create({
    body: message,
    from: "+18705942882",
    to: "+1"+phone,
  })

  return NextResponse.json({ message: "success" }, { status: 200 });
}