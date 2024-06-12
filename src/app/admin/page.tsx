import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { redirect } from "next/navigation";
import { AdminMain } from "./adminMain.component";

const AdminPage = async () => {
  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/auth/signin");

  return <AdminMain />;
};

export default AdminPage;
