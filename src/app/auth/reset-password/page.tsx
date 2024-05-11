"use client";

// import { Metadata } from "next";
import { useRef } from "react";
import { Button, Card, Text, Input } from "@mantine/core";
import Link from "next/link";
import { createServerClient, createBrowserClient } from "@supabase/ssr";
import styles from "../../page.module.scss";

const ResetPasswordPage = () => {
  // const supabase = createServerClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //     { cookies: {} },
  //   );
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const passwordRef = useRef<HTMLInputElement>(null);

  const sendLoginLink = async () => {
    const password = passwordRef.current?.value;

    try {
      // const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      //   redirectTo: 'https://example.com/update-password',
      // })
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      console.log("updated!", data);
    } catch (error) {
      console.error("Failed to update..", error);
    }
  };
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      mt="xl"
      style={{ maxWidth: 350, margin: "auto", textAlign: "center" }}
    >
      <Text fw={500}>Reset Password</Text>

      <Input placeholder="New Password" mt="xs" ref={passwordRef} />
      <Button fullWidth mt="md" onClick={sendLoginLink}>
        update password
      </Button>
      <div className="sign-up">
        <Link href="/auth/signup">
          <Button variant="transparent" color="black" mt="md">
            Create New Account
          </Button>
        </Link>
      </div>
      <Link href="/auth/signin">
        <Button variant="transparent" color="grey">
          Back To Login
        </Button>
      </Link>
    </Card>
  );
};

export default ResetPasswordPage;
