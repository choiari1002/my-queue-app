import { redirect } from "next/navigation";
import { Card, MultiSelect, TextInput, Button, Select } from "@mantine/core";
import { makeServerClient } from "@/utils/supabaseServerClient.utils";
import Link from "next/link";

const RestaurantListComponent = async () => {
  const supabase = makeServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/auth/signin");

  const { data: rData } = await supabase.from("restaurants").select("*");
  const restaurantList = (rData || []).map((r) => {
    return { id: r.id, name: r.name, city: r.city };
  });

  // const { data: rData, error: rError } = await supabase
  // .from("restaurants")
  // .select("restaurants.id, restaurants.name, restaurants.city, COUNT(queues.restaurant_id) AS queue_count")
  // .leftJoin("queues", { "restaurants.id": "queues.restaurant_id" })
  // .group("restaurants.id");

  // const { data: rData, error: rError } = await supabase
  // .from("restaurants")
  // .select("*")
  // .leftJoin("queues", { "restaurants.id": "queues.restaurant_id" });

  //   const { data: rData, error: rError } = supabase.from('restaurants').select(`
  //   id,
  //   name,
  //   queues (
  //     id,
  //   )
  // `)

// create function hello_world() returns text as $$
// select 'Hello world';
// $$ language ;

// const { data, error } = await supabase.rpc('hello_world')

  return (
    <div>
      <Select
        label="Select Preferred Area"
        data={["All", "Vancouver", "Surrey"]}
        defaultValue="All"
      ></Select>
      <Card>
        {restaurantList.map((restaurant) => {
          return (
            <Button
              variant={"subtle"}
              key={restaurant.id}
              component={Link}
              href={`/restaurant/${restaurant.id}`}
              color="black"
            >
              {restaurant.name}
            </Button>
          );
        })}
      </Card>
    </div>
  );
};

RestaurantListComponent.displayName = "RestaurantList";

export const RestaurantList = RestaurantListComponent;
