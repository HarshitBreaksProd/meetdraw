"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

const ChatCard = () => {
  return (
    <Card className="w-full py-4 overflow-clip border cursor-pointer backdrop-blur-md bg-black/25 hover:-translate-y-[2px] transition-all duration-200">
      <CardHeader className="">
        <CardTitle>Happy</CardTitle>
        <CardDescription className="truncate">
          Harshit: Here we go again, oh my gawd wtf is this
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ChatCard;
