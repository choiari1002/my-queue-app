"use client";
import { useState, useEffect, PropsWithChildren, FC } from "react";
import { useRouter } from "next/navigation";
import {
  Text,
  Button,
  Image,
  Container,
  Group,
  Divider,
  Box,
} from "@mantine/core";
import Link from "next/link";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

type RestaurantProps = {
  restaurantId: string;
};

const ResturantComponent: FC<PropsWithChildren<RestaurantProps>> = ({
  restaurantId,
}) => {
  const router = useRouter();
  const supabase = makeBrowserClient();
  const [restaurant, setRestaurant] = useState<{
    id: string;
    name: string;
    thumbnail_upload_id: string | null;
    status: string;
    operating_hours: string;
    phone: string;
    menu: string;
  } | null>(null);
  const [address, setAddress] = useState<{
    city: string;
    address_line_1: string;
    address_line_2: string | null;
    postal_code: string;
    country: string;
  } | null>(null);
  const [queueCount, setQueueCount] = useState<number>(0);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const { data: restaurantData, error: restaurantError } = await supabase
        .from("restaurants")
        .select(
          "id, name, thumbnail_upload_id, status, operating_hours, phone, menu"
        )
        .eq("id", restaurantId)
        .single();

      if (restaurantError) {
        console.error("Error fetching restaurant:", restaurantError.message);
        return;
      }

      setRestaurant(restaurantData);

      const { data: addressData, error: addressError } = await supabase
        .from("addresses")
        .select("city, address_line_1, address_line_2, postal_code, country")
        .eq("restaurant_id", restaurantId)
        .single();

      if (addressError) {
        console.error("Error fetching address:", addressError.message);
        return;
      }

      setAddress(addressData);

      const { count, error: queueCountError } = await supabase
        .from("queues")
        .select("*", { count: "exact", head: true })
        .eq("restaurant_id", restaurantId);

      if (queueCountError) {
        console.error("Error fetching queue count:", queueCountError.message);
        return;
      }

      setQueueCount(count || 0);
    };

    fetchRestaurantData();
  }, [restaurantId, supabase]);

  if (!restaurant || !address) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
    <Container>
      <Group mb={20}>
        <Button variant="subtle" onClick={() => router.push(`/restaurants?city=Vancouver&region=All`)} color="gray">
          {"<"}
        </Button>
        <Text fw={700} size="xl">
          {restaurant.name}
        </Text>
      </Group>

      <Image
        src={restaurant.thumbnail_upload_id || "/no_thumbnail.jpeg"}
        width={400}
        height={200}
        radius="md"
        alt={restaurant.name}
        mb={20}
      />

      <Text size="sm" color="dimmed">
        {address.city}
      </Text>
      <Text fw={700} size="xl">
        {restaurant.name}
      </Text>
      <Text size="sm" color="dimmed">
        {restaurant.status} | {restaurant.operating_hours}
      </Text>

      <Text color="orange" mt={10}>
        {queueCount} people waiting
      </Text>

      <Divider my={20} />

      <Text fw={700}>Business Info</Text>
      <Text size="sm">Operating Hours: {restaurant.operating_hours}</Text>
      <Text size="sm">Number: {restaurant.phone}</Text>
      <Text size="sm">Menu: {restaurant.menu}</Text>

      <Text fw={700} mt={20}>
        Location
      </Text>
      <Text size="sm">
        {address.address_line_1} {address.address_line_2}
        <br />
        {address.city}, {address.country}, {address.postal_code}
      </Text>

      <Button variant="filled" fullWidth mt={50} color="#FE6232" component={Link} href={`${restaurantId}/queues`}>
        Join the Waitlist
      </Button>
    </Container>
  );
};

ResturantComponent.displayName = "Restaurant";

export const Restaurant = ResturantComponent;
