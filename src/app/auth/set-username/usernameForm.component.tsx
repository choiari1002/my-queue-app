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

// type SignUpFromProps = {};

const UsernameComponent = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const setUsername = async (event) => {
    event.preventDefault();
    const username = usernameRef.current!.value.trim();

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert({ username: username, auth_user_id: user.id, role: 1 })
        .single();

      if (userError) {
        console.error("Error inserting username:", userError.message);
        return;
      }

      console.log("Username inserted successfully:", userData);
      router.push("/restaurants");
    } else {
      console.error("No user found");
    }
  };

  return (
    <form onSubmit={setUsername}>
      <TextInput placeholder="Username" mt="md" ref={usernameRef} />
      <Button fullWidth mt="md" type="submit" color="#FE6232">
        Set Username
      </Button>
    </form>
  );
};
UsernameComponent.displayName = "UsernameForm";

export const UsernameForm = UsernameComponent;
