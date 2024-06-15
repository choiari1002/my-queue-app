import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { QueueList } from "./queueList.component";
import { redirect } from "next/navigation";

const ManageRestaurantPage = async ({ params: { restaurantId } }: { params: { restaurantId: string } }) => {
  console.log("ManageRestaurantPage");
  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <QueueList
    restaurantId={restaurantId}
  />
  );
};

export default ManageRestaurantPage;
