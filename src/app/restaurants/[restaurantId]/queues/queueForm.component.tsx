"use client";

import { PropsWithChildren, FC } from "react";

type QueueFormProps = {
  restaurantId: string;
};

const QueueFormComponent: FC<PropsWithChildren<QueueFormProps>> = ({
  restaurantId,
}) => {
  return <>hello ariiii</>;
};

QueueFormComponent.displayName = "QueueForm";

export const QueueForm = QueueFormComponent;
