import { redirect } from "next/navigation";
import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { Main } from "./main.component";
import { AdminMain } from "./adminMain.component";

const HomePage = async () => {
  const supabase = makeServerClient();

  // Get the currently authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // If the user is logged in, fetch their user data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role_id")
      .eq("auth_user_id", user.id)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError.message);
      return;
    }

    if (!userData) {
      // If user data is not found, redirect to set username
      redirect("/auth/set-username");
    } else {
      const roleId = userData.role_id;

      // Render different components based on the user's role
      if (roleId === 4) {
        // If the user is a customer, render Main component
        return <Main />;
      } else if ([1, 2, 3].includes(roleId)) {
        // If the user is an owner, manager, or staff, render AdminMain component
        return <AdminMain />;
      } else {
        // If the user has an unknown role, handle the error
        console.error("Unknown user role:", roleId);
        return <div>Error: Unknown user role</div>;
      }
    }
  } else {
    // If the user is not logged in, redirect to sign in
    redirect("/auth/signin");
  }
};

export default HomePage;
