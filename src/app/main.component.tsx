"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Text,
  Button,
  SimpleGrid,
  Divider,
  Center,
  Container,
} from "@mantine/core";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

const MainComponent = () => {
  const supabase = makeBrowserClient();
  const cityId = "f1c906fe-4163-4201-8f9f-ba4d99524a0f";
  const [city, setCity] = useState<string>("Vancouver");
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRegions = async () => {
      const { data, error } = await supabase
        .from("regions")
        .select("id, name")
        .eq("city_id", cityId);

      if (error) {
        console.error("Error fetching regions:", error.message);
        return;
      }

      setRegions([
        { id: "All", name: "All" },
        ...data,
        { id: "More", name: "More >" },
      ]);
    };

    fetchRegions();
  }, [cityId, supabase]);

  const handleRegionClick = (regionId: string) => {
    router.push(`/restaurants?city=${city}&region=${regionId}`);
  };

  // regions 배열에서 처음 7개만 선택 (일단은..)
  const displayedRegions = regions.slice(0, 9);

  return (
    <div>
      <Container>
        <Text fw={700} size="md">
          Join waitlist for the best restaurants in
        </Text>
        <Text fw={700} size="xl">
          {city}
        </Text>

        <SimpleGrid cols={3} spacing="xs" mt={20}>
          {displayedRegions.map((region) => (
            <Button
              key={region.id}
              variant="default"
              radius="xl"
              fullWidth
              onClick={() => handleRegionClick(region.id)}
            >
              {region.name}
            </Button>
          ))}
        </SimpleGrid>
        <Divider my={20} />
        <Text fw={700} size="md">
          Explore restaurants near me
        </Text>

        <Center mt={20}>
          <Button variant="default" radius="xl">
            Allow Location to Find Nearby Restaurants
          </Button>
        </Center>
      </Container>
    </div>
  );
};

MainComponent.displayName = "Main";

export const Main = MainComponent;
