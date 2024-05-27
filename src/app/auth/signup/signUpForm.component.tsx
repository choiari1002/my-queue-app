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

// type SignUpFromProps = {};

const SignUpFormComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  // const fullNameRef = useRef<HTMLInputElement>(null);
  // const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const signUp = async (event) => {
    event.preventDefault();

    const email = emailRef.current!.value.trim();
    // const username = usernameRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();

    // username 이 유니크한지 먼저 User 테이블에 값 넣어주기 -> 만약 유니크 하지 않다면 에러메세지
    // const { error: insertError } = await supabase
    //   .from("users")
    //   .insert({ username: username, role: 1 });

    // if (insertError) {
    //   console.log("users 테이블 에러");
    //   throw insertError;
    // }

    // console.log("User added to users table");

    // 이제 이메일 보내기

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

    // 모두 잘 들어갔으면 이제 auth_user_id 넣어주기? 이게 아냐..
    // const { error: updateError } = await supabase
    //   .from("users")
    //   .insert({ auth_user_id: data.user.id });

    // if (updateError) {
    //   console.log("auth_user_id 업데이트 에러");
    //   throw updateError;
    // }
  };

  return (
    <form>
      <TextInput placeholder="Email" mt="md" ref={emailRef} />
      {/* <TextInput placeholder="Username" mt="xs" ref={usernameRef} /> */}
      <PasswordInput placeholder="Password" mt="xs" ref={passwordRef} />
      <Button fullWidth mt="md" onClick={signUp} color="#FE6232">
        Sign up
      </Button>
    </form>
  );
};
SignUpFormComponent.displayName = "SignUpForm";

export const SignUpForm = SignUpFormComponent;
