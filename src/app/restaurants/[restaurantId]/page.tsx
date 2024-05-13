import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { Restaurant } from "./restaurant.component";
import { redirect } from "next/navigation";

const RestaurantPage = async ({ params: { restaurantId } }: { params: { restaurantId: string } }) => {
  console.log("RestaurantPage");
  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/auth/signin");

  return (
    <Restaurant
    restaurantId={restaurantId}
    // chatMessages={chatMessages}
    // myUserId={user.id}
    // userMap={userMap}
  />
  );
};

export default RestaurantPage;
