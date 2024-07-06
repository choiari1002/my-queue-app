"use client";

import { PropsWithChildren, useRef, FC } from "react";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import {
  Button,
  Card,
  Image,
  Text,
  Input,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "@/app/auth/auth.module.scss";

// type SignUpFromProps = {};

const SignInFormComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const signIn = async (event) => {
    event.preventDefault();

    const email = emailRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (user) {
      // router.push("/");
      window.location.href = "/";
    }

    if (error) {
      throw error;
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={signIn}>
        <TextInput placeholder="Email" mt="md" ref={emailRef} />
        <PasswordInput placeholder="Password" mt="xs" ref={passwordRef} />
        <Button fullWidth mt="md" type="submit" color="#FE6232">
          Log In
        </Button>
      </form>
    </div>
  );
};
SignInFormComponent.displayName = "SignInForm";

export const SignInForm = SignInFormComponent;
