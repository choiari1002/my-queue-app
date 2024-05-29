"use client";

import {
  Container,
} from "@mantine/core";
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";

const AdminMainComponent = () => {

  return (
    <div>
      <Container>
        hello admin
      </Container>
    </div>
  );
};

AdminMainComponent.displayName = "AdminMain";

export const AdminMain = AdminMainComponent;
