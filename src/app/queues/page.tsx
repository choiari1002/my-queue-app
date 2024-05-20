import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { redirect } from "next/navigation";

const QueuePage = async () => {
  console.log("QueuePage");
  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/auth/signin");

  return (
    <>hello queue</>
  );
};

export default QueuePage;
