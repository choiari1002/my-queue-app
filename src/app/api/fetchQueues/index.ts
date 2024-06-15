import "server-only";
import { createAdmin } from "@/utils/supabase/admin";
import { makeServerClient } from "@/utils/supabaseServerClient.utils";

export const fetchQueues = async (restaurantId) => {
  const supabaseAuth = makeServerClient();
  const supabase = createAdmin();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    throw new Error();
  }

  const {
    data,
    error,
  } = await supabase
    .from("queues")
    .select("id, name, created_at, adults_count, children_count")
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: true });
  if (error) {
    throw new Error();
  }

  return data;
};
