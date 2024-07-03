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
  Image,
  Loader,
  Box,
  Group,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";
import NavComponent from "@/app/shared/nav/navComponent";
import styles from "@/app/main.module.scss";
import "@mantine/carousel/styles.css";

const MainComponent = () => {
  const supabase = makeBrowserClient();
  const cityId = "f1c906fe-4163-4201-8f9f-ba4d99524a0f";
  const [city, setCity] = useState<string>("Vancouver");
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);
  const [restaurantList, setRestaurantList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const router = useRouter();

  const images = [
    "https://i.imgur.com/ZuAtJwf.png",
    "https://i.imgur.com/SsaERRK.png",
    "https://i.imgur.com/6Y4hdMr.png",
  ];

  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} alt="header" />
    </Carousel.Slide>
  ));

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
    // getRestaurantList(49.191438750561474, -122.84478951449476)
    // 49.18957715361909, -122.84791871133449
    // 49.191438750561474, -122.84478951449476
  }, [cityId, supabase]);

  const handleRegionClick = (regionId: string) => {
    router.push(`/restaurants?city=${city}&region=${regionId}`);
  };

  const displayedRegions = regions.slice(0, 9);

  const getRestaurantList = async (lat: number, lng: number) => {
    let { data, error } = await supabase.rpc("get_restaurants_near_by", {
      latt: lat,
      long: lng,
    });
    setIsLoading(false);
    if (error) console.error(error);
    else {
      setRestaurantList(data);
    }
  };

  const handleAllowLocationClick = async () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setShowButton(false);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          getRestaurantList(latitude, longitude);
        },
        (error) => {
          setIsLoading(false);
          setShowButton(true);
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className={styles.container}>
      <Container>
        <Carousel withIndicators mt={20} mb={20}>
          {slides}
        </Carousel>
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

        {showButton ? (
          <Center mt={20} mb={20}>
            <Button
              variant="default"
              radius="xl"
              onClick={handleAllowLocationClick}
            >
              Allow Location to Find Nearby Restaurants
            </Button>
          </Center>
        ) : isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : restaurantList.length > 0 ? (
          <Box>
            {restaurantList.map((restaurant) => (
              <Group key={restaurant.id} mb={10}>
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
          </Box>
        ) : (
          <Center>
            <Text fw={500} size="md" mt={20} mb={20}>
              No restaurants found nearby..
            </Text>
          </Center>
        )}
        <div className="footer">
          <NavComponent />
        </div>
      </Container>
    </div>
  );
};

MainComponent.displayName = "Main";

export const Main = MainComponent;
