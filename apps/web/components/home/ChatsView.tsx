"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { useEffect, useRef, useState } from "react";
import { GiSolarSystem } from "react-icons/gi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ChatCard from "./ChatCard";
import { useAppSelector } from "@/lib/hooks/redux";

const ChatsView = () => {
  const chatsViewDivRef = useRef<HTMLDivElement>(null);
  const rooms = useAppSelector((state) => state.app.rooms);
  const [showArrow, setShowArrow] = useState<"down" | "up" | null>(null);

  useEffect(() => {
    if (
      chatsViewDivRef.current?.scrollHeight &&
      chatsViewDivRef.current?.clientHeight &&
      chatsViewDivRef.current.scrollHeight >
        chatsViewDivRef.current.clientHeight
    ) {
      if (
        chatsViewDivRef.current?.scrollTop &&
        chatsViewDivRef.current.scrollTop > 0
      ) {
        setShowArrow("up");
      } else {
        setShowArrow("down");
      }
    } else {
      setShowArrow(null);
    }

    const handleScroll = () => {
      if (
        chatsViewDivRef.current?.scrollTop &&
        chatsViewDivRef.current.scrollTop > 0
      ) {
        setShowArrow("up");
      } else {
        setShowArrow("down");
      }
    };

    chatsViewDivRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      chatsViewDivRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [rooms, chatsViewDivRef.current?.scrollTop]);

  if (!rooms) {
    return null;
  }

  return (
    <div className="flex-1 min-h-0">
      <Card className="h-full flex flex-col backdrop-blur-md bg-black/30">
        <CardHeader className="flex-shrink-0">
          <div className="flex w-full justify-between -mb-2 items-center text-xl">
            <CardTitle>Chat View</CardTitle>
          </div>
        </CardHeader>
        <CardContent
          ref={chatsViewDivRef}
          className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-2 [&::-webkit-scrollbar]:hidden py-1"
        >
          {rooms.map((room) => (
            <ChatCard key={room.id} room={room} />
          ))}
          {rooms.length === 0 && (
            <div className="flex-1 flex justify-center gap-2 text-neutral-400">
              <p>Looks like you're alone... </p>
              <div className="flex">
                <GiSolarSystem className="text-2xl rotate-y-180" />
                <GiSolarSystem className="text-2xl -ml-[1.75px]" />
              </div>
            </div>
          )}
          {showArrow === "down" && (
            <button
              onClick={() => {
                chatsViewDivRef.current?.scrollTo({
                  top: chatsViewDivRef.current?.scrollHeight,
                  behavior: "smooth",
                });
              }}
              className="absolute bottom-0 right-0 rounded-full bg-neutral-900 p-3 m-2 cursor-pointer"
            >
              <FaChevronDown className="text-2xl text-neutral-400" size={16} />
            </button>
          )}
          {showArrow === "up" && (
            <button
              onClick={() => {
                chatsViewDivRef.current?.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="absolute bottom-0 right-0 rounded-full bg-neutral-900 p-3 m-2 cursor-pointer"
            >
              <FaChevronUp className="text-2xl text-neutral-400" size={16} />
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatsView;
