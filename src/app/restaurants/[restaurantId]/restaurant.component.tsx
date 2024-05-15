"use client";

import {
  PropsWithChildren,
  useRef,
  FC,
  FormEventHandler,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";
import { Button } from "@mantine/core";

type RestaurantProps = {
  restaurantId: string;
};

const ResturantComponent: FC<PropsWithChildren<RestaurantProps>> = ({
  restaurantId,
}) => {
  const supabase = makeBrowserClient();
  const [restaurantData, setRestaurantData] = useState<any>({});
  const [queueCount, setQueueCount] = useState<number>(0);

  useEffect(() => {
    async function fetchRestaurantData() {
      // get restaurant info
      const { data: restaurantData, error: restaurantError } = await supabase
        .from("restaurants")
        .select("name, operating_hours, menu, status")
        .eq("id", restaurantId)
        .single();

      if (restaurantError) {
        console.error("Error fetching restaurant data:", restaurantError.message);
        return;
      }

      setRestaurantData(restaurantData);

      // get queue count
      const { data: queueData, error: queueError } = await supabase
        .from("queues")
        .select("count", { count: "exact" })
        .eq("restaurant_id", restaurantId);

      if (queueError) {
        console.error("Error fetching queue count:", queueError.message);
        return;
      }

      setQueueCount(queueData[0]?.count || 0);
    }

    fetchRestaurantData();
  }, [restaurantId, supabase]);

  return (
    <div>
      <h2>{restaurantData.name}</h2>
      <p>Operating Hours: {restaurantData.operating_hours}</p>
      <p>Menu: {restaurantData.menu}</p>
      <p>Status: {restaurantData.status}</p>
      <p>Queue Count: {queueCount}</p>
      <Button>Make a queue</Button>
    </div>
  );
};
ResturantComponent.displayName = "Restaurant";

export const Restaurant = ResturantComponent;
