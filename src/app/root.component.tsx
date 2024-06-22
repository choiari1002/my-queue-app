"use client";

import { LoadScript } from "@react-google-maps/api";
import { FC, PropsWithChildren } from "react";

const RootComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      language="en"
    >
      {children}
    </LoadScript>
  );
};

export const Root = RootComponent;
