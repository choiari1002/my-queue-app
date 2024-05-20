import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { redirect } from "next/navigation";
import { Queue } from "./queue.component";

const QueuePage = async () => {
  console.log("QueuePage");
  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/auth/signin");

  return (
    <>
      <Queue />
    </>
  );
};

export default QueuePage;
