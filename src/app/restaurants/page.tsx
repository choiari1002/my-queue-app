import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { redirect } from "next/navigation";
import { RestaurantList } from "./restaurantList.component";
import { useSearchParams } from "next/navigation";

const RestaurantsPage = async () => {
  const searchParams = useSearchParams();

  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/auth/signin");

  const city = searchParams.get("city");
  const regionId = searchParams.get("region");

  return (
    <RestaurantList/>
  );
};

export default RestaurantsPage;
