import { makeServerClient } from "@/utils/supabaseServerClient.utils";
// import { ChatBox } from "./chatBox";
import { redirect } from "next/navigation";

const RestaurantPage = async ({ params: { restaurantId } }: { params: { restaurantId: string } }) => {
  console.log("어디갔니 너");
  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/auth/signin");

  return (
    <div>restaurant: {restaurantId}</div>
  );
};

export default RestaurantPage;
