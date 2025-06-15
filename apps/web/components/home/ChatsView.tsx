"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import ChatCard from "./ChatCard";
import { useRef } from "react";

const ChatsView = () => {
  const chatsViewDivRef = useRef<HTMLDivElement>(null);

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
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatsView;
