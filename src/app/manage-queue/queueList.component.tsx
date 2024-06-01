"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Text,
  Button,
  Group,
  SimpleGrid,
  Space,
} from "@mantine/core";
import { format } from "date-fns";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

const QueueListComponent = () => {
  const router = useRouter();
  const supabase = makeBrowserClient();
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [queues, setQueues] = useState<
    {
      id: string;
      name: string;
      created_at: string;
      adults_count: number;
      children_count: number;
    }[]
  >([]);

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

    const fetchQueues = async () => {
      const { data, error } = await supabase
        .from("queues")
        .select("id, name, created_at, adults_count, children_count")
        .eq("restaurant_id", restaurantId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching queues:", error.message);
        return;
      }

      setQueues(data);
    };

    fetchQueues();
  }, [restaurantId, supabase]);

  const handleCallCustomer = (queueId: string) => {
    console.log("Call customer:", queueId);
  };

  const handleSeatCustomer = (queueId: string) => {
    console.log("Seat customer:", queueId);
  };

  return (
    <Container>
      <Group mb={20}>
        <Button variant="subtle" color="gray" onClick={() => router.push("/")}>
          {"<"}
        </Button>
        <Text fw={700} size="xl">
          Waitlist
        </Text>
      </Group>

      <SimpleGrid cols={1} spacing="md">
        {queues.map((queue) => (
          <Group key={queue.id} align="flex-start">
            <div>
              <Text fw={700}>{queue.name}</Text>
              <Text size="sm">
                {format(new Date(queue.created_at), "h:mm a")}
              </Text>
              <Text size="sm">
                Adults: {queue.adults_count}, Children: {queue.children_count}
              </Text>
            </div>
            <Group>
              <Button variant="default" radius="xl" onClick={() => handleCallCustomer(queue.id)}>
                Call Customer
              </Button>
              <Button variant="default" radius="xl" onClick={() => handleSeatCustomer(queue.id)}>
                Seat Customer
              </Button>
            </Group>
          </Group>
        ))}
      </SimpleGrid>
    </Container>
  );
};

QueueListComponent.displayName = "QueueList";

export const QueueList = QueueListComponent;
