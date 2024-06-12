"use client"

import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { redirect } from "next/navigation";
import { RestaurantList } from "./restaurantList.component";
import { useSearchParams } from "next/navigation";

const RestaurantsPage = () => {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const regionId = searchParams.get("region");

  console.log(city);
  console.log(regionId);

  return (
    <RestaurantList/>
  );
};

export default RestaurantsPage;
