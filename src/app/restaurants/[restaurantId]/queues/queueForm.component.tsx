"use client";

import { useState, useEffect } from "react";
import { PropsWithChildren, FC } from "react";
import { redirect, useRouter } from "next/navigation";
import {
  Text,
  Button,
  Image,
  TextInput,
  NumberInput,
  Divider,
  Container,
  Group,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

type QueueFormProps = {
  restaurantId: string;
};
// phone number validation..
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Contact number is required"),
  adults_count: z.number().min(1, "At least one adult is required").max(10),
  children_count: z.number().min(0).max(10),
  request: z.string().max(50, "Request cannot exceed 50 characters"),
});

type FormValues = z.infer<typeof schema>;

const QueueFormComponent: FC<PropsWithChildren<QueueFormProps>> = ({
  restaurantId,
}) => {
  const router = useRouter();
  const supabase = makeBrowserClient();
  const [restaurant, setRestaurant] = useState<{
    name: string;
    thumbnail_upload_id: string | null;
  } | null>(null);
  const [address, setAddress] = useState<{
    address_line_1: string;
    city: string;
  } | null>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const { data: restaurantData, error: restaurantError } = await supabase
        .from("restaurants")
        .select("name, thumbnail_upload_id")
        .eq("id", restaurantId)
        .single();

      if (restaurantError) {
        console.error("Error fetching restaurant:", restaurantError.message);
        return;
      }

      setRestaurant(restaurantData);

      const { data: addressData, error: addressError } = await supabase
        .from("addresses")
        .select("address_line_1, city")
        .eq("restaurant_id", restaurantId)
        .single();

      if (addressError) {
        console.error("Error fetching address:", addressError.message);
        return;
      }

      setAddress(addressData);
    };

    fetchRestaurantData();
  }, [restaurantId, supabase]);

  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      adults_count: 0,
      children_count: 0,
      request: "",
    },

    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: FormValues) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { error } = await supabase.from("queues").insert({
      name: values.name,
      phone: values.phone,
      adults_count: values.adults_count,
      children_count: values.children_count,
      request: values.request,
      restaurant_id: restaurantId,
      created_by: user.id,
    });

    if (error) {
      alert(JSON.stringify(error));
    } else {
      alert("Successfully added to the queue!");
      router.push(`queues/confirmation`);

    }
  };

  if (!restaurant || !address) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Group mt={20} mb={20}>
        <Button
          variant="subtle"
          onClick={() => router.push(`/restaurants/${restaurantId}`)}
          color="gray"
        >
          {"<"}
        </Button>
        <Text fw={700} size="xl">
          Join the Waitlist
        </Text>
      </Group>

      <Group mb={20}>
        <Image
          src={restaurant.thumbnail_upload_id || "/no_image.png"}
          width={80}
          height={80}
          radius="md"
          alt={restaurant.name}
        />
        <div>
          <Text fw={700}>{restaurant.name}</Text>
          <Text size="sm">
            {address.address_line_1}, {address.city}
          </Text>
        </div>
      </Group>

      <Divider my={20} />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Text fw={700} mb={5}>
          Please fill your name *
        </Text>
        <TextInput {...form.getInputProps("name")} required mb={20} />

        <Text fw={700} mb={5}>
          Please fill your contact number *
        </Text>
        <TextInput {...form.getInputProps("phone")} required mb={20} />

        <Text fw={700} mb={5}>
          Please select the number of visitors
        </Text>

        <Text fw={700} size="sm">
          Adult
        </Text>
        <NumberInput {...form.getInputProps("adults_count")} min={1} max={10} />

        <Text fw={700} size="sm">
          Child (under the age of 5)
        </Text>
        <NumberInput
          {...form.getInputProps("children_count")}
          min={0}
          max={10}
        />

        <Text fw={700} mb={5}>
          Request
        </Text>
        <TextInput
          {...form.getInputProps("request")}
          placeholder="You can write up to 50 characters maximum"
          mb={20}
        />

        <Button type="submit" variant="filled" fullWidth color="#FE6232">
          Apply
        </Button>
      </form>
    </Container>
  );
};

QueueFormComponent.displayName = "QueueForm";

export const QueueForm = QueueFormComponent;
