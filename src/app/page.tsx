import { redirect } from "next/navigation";
import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { Main } from "./main.component";

const HomePage = async () => {
  const supabase = makeServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // 사용자가 로그인되어 있고, 등록된 사용자인 경우
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select()
      .eq("auth_user_id", user.id);

    if (userError) {
      console.error("Error fetching user data:", userError.message);
      return;
    }

    if (userData.length === 0) {
      // 사용자 정보가 등록되지 않은 경우
      redirect("/auth/set-username");
    }

  } else {
    // 사용자가 로그인되어 있지 않은 경우
    redirect("/auth/signin");
  }

  return (
    <Main/>
  );
};

export default HomePage;
