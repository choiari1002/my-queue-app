"use client"

import { PropsWithChildren, useRef, FC } from "react";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { Button, Card, Image, Text, Input, TextInput, PasswordInput } from "@mantine/core";
import { useRouter } from "next/navigation";

// type SignUpFromProps = {};

const SignInFormComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const signIn = async (event) => {
    event.preventDefault();

    const email = emailRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();

    const { data: {user}, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (user) {
      router.push("/");
      window.location.href = "/";
    }

    if (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <form onSubmit={signIn}>
      <TextInput placeholder="Email" mt="md" ref={emailRef} />
      <PasswordInput placeholder="Password" mt="xs" ref={passwordRef} />
      <Button fullWidth mt="md" type="submit" color="#FE6232">
        Log In
      </Button>
    </form>
  );
};
SignInFormComponent.displayName = "SignInForm";

export const SignInForm = SignInFormComponent;

// "use client";

// import { PropsWithChildren, useRef, FC, useEffect, useState } from "react";
// import { createBrowserClient, createServerClient } from "@supabase/ssr";
// import { Button, Card, Image, Text, Input, TextInput, PasswordInput, Notification } from "@mantine/core";
// import { useRouter } from "next/navigation";

// const SignInFormComponent = () => {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   const [errorNotification, setErrorNotification] = useState(null);

//   const supabase = createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );

//   useEffect(() => {
//     const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === 'SIGNED_IN') {
//         router.push("/");
//       }
//     });

//     return () => {
//       authListener?.unsubscribe();
//     };
//   }, [router, supabase]);

//   const signIn = async (event) => {
//     event.preventDefault();

//     const email = emailRef.current!.value.trim();
//     const password = passwordRef.current!.value.trim();

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       console.error(error);
//       setErrorNotification(error.message);
//       throw error;
//     } else {
//       setErrorNotification(null);
//     }
//   };

//   return (
//     <form onSubmit={signIn}>
//       <TextInput placeholder="Email" mt="md" ref={emailRef} />
//       <PasswordInput placeholder="Password" mt="xs" ref={passwordRef} />
//       <Button fullWidth mt="md" type="submit" color="#FE6232">
//         Log In
//       </Button>
//       {errorNotification && (
//         <Notification color="red" title="Error" mt="md">
//           {errorNotification}
//         </Notification>
//       )}
//     </form>
//   );
// };
// SignInFormComponent.displayName = "SignInForm";

// export const SignInForm = SignInFormComponent;
