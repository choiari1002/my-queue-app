import { useRef } from "react";
import { Button, Card, Image, Input } from "@mantine/core";
import Link from "next/link";
import { createServerClient } from "@supabase/ssr";
import styles from '../../page.module.scss';
import { SignInForm } from "@/app/auth/signin/signinForm.component";

const SignInPage = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      mt="xl"
      style={{ maxWidth: 350, margin: "auto", textAlign: "center", background: "#FCF2E8"}}
    >
      <Image src={"/logo2.png"} alt={"whatever"} width={"100"} height={"100"}></Image>
      <SignInForm />

      <Link href="/auth/forgot-password">
        <Button variant="transparent" color="black" mt="sm">
          Forgot Password?
        </Button>
      </Link>

      <div className="sign-up" style={{ color: "gray" }}>
        Don&apos;t have an account?
        <Link href="/auth/signup">
          <Button variant="transparent" color="black">
            Sign up
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default SignInPage;
