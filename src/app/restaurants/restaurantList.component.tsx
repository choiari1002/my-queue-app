"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Text,
  Button,
  Image,
  Select,
  Container,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

const RestaurantListComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";
  const initialRegionId = searchParams.get("region") || "All"; // 기본값 "All"
  const [regionId, setRegionId] = useState(initialRegionId);
  const [restaurants, setRestaurants] = useState<
    {
      id: string;
      name: string;
      thumbnail_upload_id: string | null;
      city: string;
      queue_count: number;
    }[]
  >([]);
  const [regionOptions, setRegionOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const supabase = makeBrowserClient();

  useEffect(() => {
    const fetchRestaurants = async () => {
      // 1. 도시 이름으로 cityId 가져오기
      const { data: cityData, error: cityError } = await supabase
        .from("cities")
        .select("id")
        .eq("name", city)
        .single();

      if (cityError) {
        console.error("Error fetching city:", cityError.message);
        return;
      }

      const cityId = cityData?.id;

      if (!cityId) {
        console.error("City not found:", city);
        return;
      }

      // 2. cityId로 regions 데이터 가져오기
      const { data: regionsData, error: regionsError } = await supabase
        .from("regions")
        .select("id, name")
        .eq("city_id", cityId);

      if (regionsError) {
        console.error("Error fetching regions:", regionsError.message);
        return;
      }

      setRegionOptions([
        { value: "All", label: "All" },
        ...regionsData.map((region) => ({
          value: region.id,
          label: region.name,
        })),
      ]);
    };

    const fetchRestaurantQueueCount = async () => {
      const { data, error } = await supabase.rpc("restaurant_queue_count");
      if (error) {
        console.error("Error fetching restaurants:", error.message);
        return;
      }

      let filteredRestaurants = data;

      if (regionId !== "All") {
        // 선택된 regionId로 regions 테이블에서 region 이름 가져오기
        const { data: regionData, error: regionError } = await supabase
          .from("regions")
          .select("name")
          .eq("id", regionId)
          .single();

        if (regionError) {
          console.error("Error fetching region name:", regionError.message);
          return;
        }

        const regionName = regionData?.name;

        if (!regionName) {
          console.error("Region not found:", regionId);
          return;
        }

        filteredRestaurants = data.filter(
          (restaurant) => restaurant.city === regionName
        );
      }

      const filteredRestaurantsWithTypes = filteredRestaurants.map((restaurant) => ({
        id: restaurant.id as string,
        name: restaurant.name as string,
        thumbnail_upload_id: restaurant.thumbnail_upload_id as string,
        city: restaurant.city as string,
        queue_count: restaurant.queue_count as number,
      }));

      setRestaurants(filteredRestaurantsWithTypes);
    };

    fetchRestaurants();
    fetchRestaurantQueueCount();
  }, [city, regionId, supabase]);

  const handleRegionChange = (value: string) => {
    setRegionId(value);
    router.push(`/restaurants?city=${city}&region=${value}`);
  };

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurants/${restaurantId}`);
  };


  return (
    <Container>
      <Group mb={20}>
        <Button variant="subtle" color="gray" onClick={() => router.push("/")}>
          {"<"}
        </Button>
        <Text fw={700} size="xl">
          {city}
        </Text>
      </Group>

      <Select
        value={regionId}
        onChange={handleRegionChange}
        data={regionOptions}
        allowDeselect={false}
      />

<SimpleGrid cols={1} mt={20}>
        {restaurants.map((restaurant) => (
          <Group
            key={restaurant.id}
            mb={10}
            onClick={() => handleRestaurantClick(restaurant.id)}
          >
            <Image
              src={restaurant.thumbnail_upload_id || "/no_image.png"}
              width={80}
              height={80}
              radius="md"
              alt={restaurant.name}
            />
            <div>
              <Text fw={500}>{restaurant.name}</Text>
              <Text color="orange" size="sm">
                {restaurant.queue_count} people waiting
              </Text>
            </div>
          </Group>
        ))}
      </SimpleGrid>
    </Container>
  );
};

RestaurantListComponent.displayName = "RestaurantList";

export const RestaurantList = RestaurantListComponent;
