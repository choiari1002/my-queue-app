import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { QueueConfirmation } from "./QueueConfirmation.component.component";
import { redirect } from "next/navigation";

const QueueConfirmationPage = async ({
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

  return <QueueConfirmation restaurantId={restaurantId} />;
};

export default QueueConfirmationPage;
