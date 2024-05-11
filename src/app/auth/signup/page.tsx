"use client";

import { useRef } from "react";
import { Button, Card, Image, Text, Input } from "@mantine/core";
import Link from "next/link";
import { createServerClient } from "@supabase/ssr";
import styles from "../../page.module.scss";
import type { Metadata } from "next";
import { SignUpForm } from "@/app/auth/signup/signUpForm.component";

const SignUpPage = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      mt="xl"
      style={{ maxWidth: 350, margin: "auto", textAlign: "center", background: "#FCF2E8" }}
    >
      <Image src={"/logo2.png"} alt={"whatever"} width={"100"} height={"100"}></Image>
      <SignUpForm />
      <div className="sign-in">
        Have an account?
        <Link href="/auth/signin">
          <Button variant="transparent" color="black">
            Log in
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default SignUpPage;
