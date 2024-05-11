
"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Card, MultiSelect, TextInput, Button, Select } from "@mantine/core";
// import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";
import Link from "next/link";

const RestaurantsPage = () => {
  const supabase = makeBrowserClient();
  // 현재 선택된 지역 상태와 레스토랑 리스트 상태 추가
  const [selectedArea, setSelectedArea] = useState("All");
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    // const {data} = supabase.rpc("restaurant_queue_count")
    // .then(console.log)

    // 선택된 지역에 따라 레스토랑 리스트를 업데이트
    const fetchRestaurants = async () => {
      let query = supabase.from("restaurants").select("*");
      if (selectedArea !== "All") {
        query = query.eq("city", selectedArea);
      }
      const { data } = await query;
      setRestaurantList(data || []);
    };
    fetchRestaurants();
  }, [selectedArea, supabase]); // selectedArea가 변경될 때마다

  return (
    <div>
      <Select
        label="Select Preferred Area"
        data={["All", "Vancouver", "Surrey"]}
        value={selectedArea}
        onChange={(value) => setSelectedArea(value)}
      ></Select>
      <Card>
        {restaurantList.map((restaurant) => {
          return (
            <Button
              variant={"subtle"}
              key={restaurant.id}
              component={Link}
              href={`/restaurants/${restaurant.id}`}
              color="black"
            >
              {restaurant.name}
            </Button>
          );
        })}
      </Card>
    </div>
  );
};

export default RestaurantsPage;
