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
import { Button, Card, TextInput } from "@mantine/core";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";
// import { Database } from "@/supabase.types";

type RestaurantProps = {
  restaurantId: string;
};

const ResturantComponent: FC<PropsWithChildren<RestaurantProps>> = ({
  restaurantId,
}) => {
  const supabase = makeBrowserClient();

  return <div>{restaurantId}</div>;
};
ResturantComponent.displayName = "Restaurant";

export const Restaurant = ResturantComponent;
