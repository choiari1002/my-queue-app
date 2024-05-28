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
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

// type SignUpFromProps = {};

const SignInFormComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const images = [
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
  ];

  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));

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
      router.push("/");
      console.log(user);
    }

    if (error) {
      throw error;
    }
  };

  return (
    <>
      <Carousel
        withIndicators
        height={200}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        mt={20}
      >
        {slides}
      </Carousel>
      <form onSubmit={signIn}>
        <TextInput placeholder="Email" mt="md" ref={emailRef} />
        <PasswordInput placeholder="Password" mt="xs" ref={passwordRef} />
        <Button fullWidth mt="md" type="submit" color="#FE6232">
          Log In
        </Button>
      </form>
    </>
  );
};
SignInFormComponent.displayName = "SignInForm";

export const SignInForm = SignInFormComponent;
