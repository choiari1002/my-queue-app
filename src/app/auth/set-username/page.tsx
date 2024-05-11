import { useRef } from "react";
import { Button, Card, Image, Input } from "@mantine/core";
import Link from "next/link";
import { createServerClient } from "@supabase/ssr";
import styles from '../../page.module.scss';
import { SignInForm } from "@/app/auth/signin/signinForm.component";
import { UsernameForm } from "./usernameForm.component";

const SetUsernamePage = () => {
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
      <UsernameForm/>

    </Card>
  );
};

export default SetUsernamePage;
