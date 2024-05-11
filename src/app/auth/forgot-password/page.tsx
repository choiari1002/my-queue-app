"use client";

// import { Metadata } from "next";
import { useRef } from "react";
import { Button, Card, Text, Input } from "@mantine/core";
import Link from "next/link";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import styles from '../../page.module.scss';

const ForgotPasswordPage = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const emailRef = useRef<HTMLInputElement>(null);

  const sendLoginLink = async () => {
    const email = emailRef.current?.value;

    if (email) {
      try {
        //   const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "http://localhost:3000/auth/reset-password",
        });

        if (error) {
          throw error;
        }

        console.log("Password reset email sent successfully", data);
      } catch (error) {
        console.error("Failed to send password reset email:", error);
      }
    } else {
      console.error("Email is undefined");
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
      <Text fw={500}>Trouble logging in?</Text>
      <Text size="sm" c="dimmed" fw={500} mt="xs">
        Enter your email, phone, or username and we&apos;ll send you a link to get back into your
        account.
      </Text>
      <Input placeholder="Email" mt="xs" ref={emailRef} />
      <Button fullWidth mt="md" onClick={sendLoginLink}>
        Send login link
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

export default ForgotPasswordPage;
