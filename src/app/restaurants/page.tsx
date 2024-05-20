"use client";

import { useState, useEffect } from "react";
import { Card, Button, Select } from "@mantine/core";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";
import Link from "next/link";

const RestaurantsPage = () => {
  const supabase = makeBrowserClient();

  // 현재 큐 데이터 상태 추가
  const [queueData, setQueueData] = useState([]);
  // 현재 선택된 지역 상태 추가
  // 지역 테이블 만들기
  const [selectedArea, setSelectedArea] = useState("All");
  // 레스토랑 리스트 상태 추가
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    // "restaurant_queue_count" 함수를 사용하여 현재 큐 데이터 가져오기
    const fetchQueueData = async () => {
      const { data, error } = await supabase.rpc("restaurant_queue_count");
      if (error) {
        console.error("Error fetching queue count:", error.message);
      } else {
        setQueueData(data || []);
      }
    };
    fetchQueueData();
  }, [supabase]);

  useEffect(() => {
    // 선택된 지역에 따라 식당 리스트를 설정
    const filteredRestaurants = queueData.filter(
      (item) => selectedArea === "All" || item.city === selectedArea
    );
    setRestaurantList(filteredRestaurants);
  }, [selectedArea, queueData]);

  return (
    <div>
      <Select
        label="Select Preferred Area"
        data={["All", "Vancouver", "Surrey"]}
        value={selectedArea}
        onChange={(value) => setSelectedArea(value)}
      ></Select>
      <Card>
        {restaurantList.map((restaurant) => (
          <div key={restaurant.name}>
            <Button
              variant={"subtle"}
              component={Link}
              href={`/restaurants/${restaurant.id}`}
              color="black"
            >
              {restaurant.name}
            </Button>
            <span style={{ marginLeft: "10px" }}>{restaurant.queue_count}</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default RestaurantsPage;
