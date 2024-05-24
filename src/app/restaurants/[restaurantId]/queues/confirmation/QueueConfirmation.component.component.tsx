"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Text,
  Button,
  Container,
  Group,
  Box,
} from "@mantine/core";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

const QueueConfirmationComponent = ({ restaurantId }: { restaurantId: string }) => {
  const router = useRouter();
  const supabase = makeBrowserClient();

  // State variables to store queue position, restaurant name, and party size
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [partySize, setPartySize] = useState<number | null>(null);

  useEffect(() => {
    const fetchQueueData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User not logged in");
        return;
      }

      // Fetch the current user's queue information
      const { data: userQueueData, error: userQueueError } = await supabase
      .from("queues")
      .select("created_at, adults_count, children_count") // adults_count, children_count 추가
      .eq("restaurant_id", restaurantId)
      .eq("created_by", user.id)
      .single();

      if (userQueueError) {
        console.error("Error fetching user queue data:", userQueueError.message);
        return;
      }

      // Fetch all queue information for the restaurant (ordered by created_at ascending)
      const { data: allQueueData, error: allQueueError } = await supabase
        .from("queues")
        .select("created_at, created_by") // Select created_at and created_by
        .eq("restaurant_id", restaurantId)
        .order("created_at", { ascending: true });

      if (allQueueError) {
        console.error("Error fetching all queue data:", allQueueError.message);
        return;
      }

      // Calculate the current user's queue position
      const position = allQueueData.findIndex(
        (queue) =>
          queue.created_at === userQueueData?.created_at &&
          queue.created_by === user.id
      );

      setQueuePosition(position + 1); // Start from 1

      // Calculate party size
      const userQueue = allQueueData[position];
      setPartySize(
        (userQueueData?.adults_count || 0) + (userQueueData?.children_count || 0)
      );

      // Fetch restaurant name
      const { data: restaurantData, error: restaurantError } = await supabase
        .from("restaurants")
        .select("name")
        .eq("id", restaurantId)
        .single();

      if (restaurantError) {
        console.error("Error fetching restaurant:", restaurantError.message);
        return;
      }

      setRestaurantName(restaurantData?.name || "");
    };

    fetchQueueData();
  }, [restaurantId, supabase]);

  if (queuePosition === null || restaurantName === null || partySize === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {/* Header with back button and title */}
      <Group mb={20}>
        <Button variant="subtle" onClick={() => router.back()}>
          {"<"}
        </Button>
        <Text fw={700} size="xl">
          Queue Confirmation
        </Text>
      </Group>

      {/* Queue position information */}
      <Text fw={700} size="xl">
        Currently <Text span color="orange">{queuePosition}</Text> in queue
      </Text>

      {/* Restaurant information box */}
      <Box
      >
        <Group mb={5}>
          <Text fw={500}>Restaurant Name</Text>
          <Text>{restaurantName}</Text>
        </Group>
        <Group>
          <Text fw={500}>Party Size</Text>
          <Text>{partySize}</Text>
        </Group>
        <Group mt={5}>
          <Text fw={500}>Estimated Wait Time</Text>
          <Text>30 min</Text>
        </Group>
      </Box>

      <Button
        variant="default"
        fullWidth
        mt={20}
        onClick={() => router.push("/")}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export const QueueConfirmation = QueueConfirmationComponent;
