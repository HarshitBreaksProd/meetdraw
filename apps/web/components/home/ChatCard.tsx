"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Room } from "@/types";
import { setActiveRoom, setHomeView } from "@/lib/features/meetdraw/appSlice";
import { useAppDispatch } from "@/lib/hooks/redux";

const ChatCard = ({ room }: { room: Room }) => {
  const dispatch = useAppDispatch();
  return (
    <Card
      onClick={() => {
        dispatch(setHomeView("chat"));
        dispatch(setActiveRoom(room));
      }}
      className="w-full py-4 overflow-clip border cursor-pointer backdrop-blur-md bg-black/25 hover:-translate-y-[2px] transition-all duration-200"
    >
      <CardHeader className="">
        <CardTitle>{room.title}</CardTitle>
        {room.Chat[0]?.user?.username ? (
          <CardDescription className="truncate">
            {room.Chat[0]?.user?.username}: {room.Chat[0]?.content}
          </CardDescription>
        ) : (
          <CardDescription className="truncate">
            Room by {room.admin.username}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
};

export default ChatCard;
