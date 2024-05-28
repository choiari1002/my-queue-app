"use client"

import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";
import { FC } from "react"

const AuthCallbackPage: FC = () => {
    const supabase = makeBrowserClient();

    return <></>
};

export default AuthCallbackPage;