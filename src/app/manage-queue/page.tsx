import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { redirect } from "next/navigation";
import { QueueList } from "./queueList.component";

const ManageQueuePage = async () => {
  console.log("ManageQueuePage");
  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/auth/signin");

  return (
    <QueueList/>
  );
};

export default ManageQueuePage;
