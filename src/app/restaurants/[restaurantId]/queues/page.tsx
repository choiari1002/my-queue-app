import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { QueueForm } from "./queueForm.component";
import { redirect } from "next/navigation";

const AddToQueuePage = async ({
  params: { restaurantId },
}: {
  params: { restaurantId: string };
}) => {
  console.log("AddToQueuePage");
  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/auth/signin");

  console.log(restaurantId);

  return <QueueForm restaurantId={restaurantId} />;
};

export default AddToQueuePage;
