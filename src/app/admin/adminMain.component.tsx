"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Text,
  Button,
  Center,
  SimpleGrid,
} from "@mantine/core";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

const AdminMainComponent = () => {
  const router = useRouter();
  const supabase = makeBrowserClient();
  const [restaurants, setRestaurants] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User not logged in");
        return;
      }

      // Get the user ID from the users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("auth_user_id", user.id)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError.message);
        return;
      }

      const userId = userData?.id;

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      // Fetch restaurant IDs associated with the user from the user_roles table
      const { data: userRolesData, error: userRolesError } = await supabase
        .from("user_roles")
        .select("restaurant_id")
        .eq("user_id", userId);

      if (userRolesError) {
        console.error("Error fetching user roles:", userRolesError.message);
        return;
      }

      const restaurantIds = userRolesData?.map((role) => role.restaurant_id);

      if (!restaurantIds || restaurantIds.length === 0) {
        console.error("No restaurants found for user");
        return;
      }

      // Fetch restaurant names using the restaurant IDs
      const { data: restaurantsData, error: restaurantsError } = await supabase
        .from("restaurants")
        .select("id, name")
        .in("id", restaurantIds);

      if (restaurantsError) {
        console.error("Error fetching restaurants:", restaurantsError.message);
        return;
      }

      setRestaurants(restaurantsData);
    };

    fetchRestaurants();
  }, [supabase]);

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/admin/${restaurantId}`);
  };

  return (
    <Container>
      <Text fw={700} size="xl" mb={20}>
        Hello, Admin
      </Text>

      <SimpleGrid cols={1} spacing="md" mb={20}>
        {restaurants.map((restaurant) => (
          <Center key={restaurant.id}>
            <Button variant="outline" onClick={() => handleRestaurantClick(restaurant.id)}>
              {restaurant.name}
            </Button>
          </Center>
        ))}
      </SimpleGrid>

      <Center>
        <Button variant="default" onClick={() => router.push("/main")}>
          Return to User Site
        </Button>
      </Center>
    </Container>
  );
};

AdminMainComponent.displayName = "AdminMain";

export const AdminMain = AdminMainComponent;
