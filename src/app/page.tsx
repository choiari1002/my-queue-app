import { redirect } from "next/navigation";
import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { Main } from "./main.component";

const HomePage = async () => {
  const supabase = makeServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError.message);
      return;
    }

    if (!userData) {
      redirect("/auth/set-username");
    } else {
      const userId = userData.id;

      const { data: userRoleData, error: userRoleError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("user_id", userId);

      if (userRoleError) {
        console.error("Error fetching user role:", userRoleError.message);
        return;
      }

      console.log("000");
      if (userRoleData.length >0) {
        // If the user has a role, redirect to the admin page
        redirect("/admin");
      } else {
        // If the user does not have a role, render the Main component
        return <Main />;
      }
    }
  } else {
    redirect("/auth/signin");
  }
};

export default HomePage;

