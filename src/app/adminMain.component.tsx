"use client";
import { useState, useEffect } from "react";
import { Container, Text, Button, Group } from "@mantine/core";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

const AdminMainComponent = () => {
  const supabase = makeBrowserClient();
  const [restaurant, setRestaurant] = useState<{
    name: string;
    status: string;
  } | null>(null);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User not logged in");
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("restaurant_id")
        .eq("auth_user_id", user.id)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError.message);
        return;
      }

      setRestaurantId(userData?.restaurant_id);
    };

    fetchRestaurantData();
  }, [supabase]);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchRestaurantData = async () => {
      const { data: restaurantData, error: restaurantError } = await supabase
        .from("restaurants")
        .select("name, status")
        .eq("id", restaurantId)
        .single();

      if (restaurantError) {
        console.error("Error fetching restaurant data:", restaurantError.message);
        return;
      }

      setRestaurant(restaurantData);
    };

    fetchRestaurantData();
  }, [restaurantId, supabase]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const handleStatusToggle = async () => {
    if (!restaurantId) return;

    const newStatus = restaurant.status === "open" ? "closed" : "open";

    console.log(newStatus);

    // todo: it's not working now..
    const { error } = await supabase
      .from("restaurants")
      .update({ status: newStatus })
      .eq("id", restaurantId);

    if (error) {
      console.error("Error updating restaurant status:", error.message);
    } else {
      console.log(restaurantId);
      setRestaurant({ ...restaurant, status: newStatus });
    }
  };

  return (
    <Container>
      <Text fw={700} size="xl">
        Hello, {restaurant.name}
      </Text>

      <Group mt={20}>
        <Button onClick={handleStatusToggle}>
          {restaurant.status === "open" ? "Close Restaurant" : "Open Restaurant"}
        </Button>
        <Button>Manage Restaurant</Button>
        <Button>Add Staff</Button>
      </Group>
    </Container>
  );
};

AdminMainComponent.displayName = "AdminMain";

export const AdminMain = AdminMainComponent;
