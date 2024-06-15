"use client"
import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { redirect } from "next/navigation";
import { RestaurantList } from "./restaurantList.component";
import { useSearchParams } from "next/navigation";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const RestaurantsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      language="en"
    >{children}</LoadScript>
  );
};

export default RestaurantsLayout;
