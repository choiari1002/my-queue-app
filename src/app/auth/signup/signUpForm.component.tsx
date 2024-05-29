import { PropsWithChildren, useRef, FC } from "react";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import {
  Button,
  TextInput,
  PasswordInput,
} from "@mantine/core";

// type SignUpFromProps = {};

const SignUpFormComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const signUp = async (event) => {
    event.preventDefault();

    const email = emailRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();

    const { data, error }: { data: any; error: any } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            originUrl: location.origin
          },
          emailRedirectTo: `${location.origin}/api/auth`,
        },
      });

    if (error) {
      throw error;
    }

    console.log("Sign up successful:", data);
  };

  return (
    <form>
      <TextInput placeholder="Email" mt="md" ref={emailRef} />
      <PasswordInput placeholder="Password" mt="xs" ref={passwordRef} />
      <Button fullWidth mt="md" onClick={signUp} color="#FE6232">
        Sign up
      </Button>
    </form>
  );
};
SignUpFormComponent.displayName = "SignUpForm";

export const SignUpForm = SignUpFormComponent;
