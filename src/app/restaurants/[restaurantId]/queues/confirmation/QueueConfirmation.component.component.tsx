"use client";

import { useState, useEffect } from "react";
import { PropsWithChildren, FC } from "react";
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
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

type QueueConfirmationProps = {
  restaurantId: string;
};

const QueueConfirmationComponent: FC<PropsWithChildren<QueueConfirmationProps>> = ({
  restaurantId,
}) => {
  return (
    <Container>
      {restaurantId}
    </Container>
  );
};

QueueConfirmationComponent.displayName = "QueueConfirmation";

export const QueueConfirmation = QueueConfirmationComponent;
