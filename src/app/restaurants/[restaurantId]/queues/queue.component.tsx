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
import { makeBrowserClient } from "@/utils/supabaseBrowserClient.utils";
import { Button } from "@mantine/core";
import Link from "next/link";

const QueueComponent = () => {
  const supabase = makeBrowserClient();

  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const usernameRef = useRef(null);
  const contactNumberRef = useRef(null);
  const adultCountRef = useRef(null);
  const childCountRef = useRef(null);

  const handleSubmit = async (event) => {
    // 대기열 등록 로직 추가하기..
  };

  return (
    <div>
      <h1>Queue Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contact Number:
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Adult Count:
          <input
            type="number"
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Child Count:
          <input
            type="number"
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
        <br />
        <Button>Make a queue</Button>
      </form>
    </div>
  );
};
QueueComponent.displayName = "Queue";

export const Queue = QueueComponent;
