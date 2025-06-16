"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Room } from "@/types";

const ChatCard = ({ room }: { room: Room }) => {
  return (
    <Card className="w-full py-4 overflow-clip border cursor-pointer backdrop-blur-md bg-black/25 hover:-translate-y-[2px] transition-all duration-200">
      <CardHeader className="">
        <CardTitle>{room.title}</CardTitle>
        {room.Chat[0]?.user?.name ? (
          <CardDescription className="truncate">
            {room.Chat[0]?.user?.name}: {room.Chat[0]?.content}
          </CardDescription>
        ) : (
          <CardDescription className="truncate">
            Room by {room.admin.name}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
};

export default ChatCard;
