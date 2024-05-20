"use client"

import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { redirect } from "next/navigation";
import { RestaurantList } from "./restaurantList.component";
import { useSearchParams } from "next/navigation"; // useSearchParams 추가

const RestaurantsPage = () => {
  const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기
  const city = searchParams.get("city");
  const regionId = searchParams.get("region");

  console.log(city);
  console.log(regionId);

  return (
    <RestaurantList/>
  );
};

export default RestaurantsPage;
