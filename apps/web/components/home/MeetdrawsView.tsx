"use client";

import { Input } from "@workspace/ui/components/input";
import { BiSearch } from "react-icons/bi";
import MeetdrawCard from "./MeetdrawCard";
import { useAppSelector } from "@/lib/hooks/redux";

const MeetdrawsView = () => {
  const rooms = useAppSelector((state) => state.app.rooms) || [];

  if (!rooms) {
    return null;
  }
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-xl font-medium">Your Meetdraws</h3>

        <div className="relative w-fit flex items-center rounded-lg">
          <Input
            className="max-w-72 min-w-72 relative focus-visible:border-green-600/50 focus-visible:ring-green-600/20"
            placeholder="Type to search"
          ></Input>
          <div className="bg-transparent absolute right-0 rounded-lg py-2 pr-3">
            <BiSearch className="" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 auto-rows-min gap-4 flex-1 min-h-0 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden">
        {rooms.map((room) => (
          <MeetdrawCard key={room.id} room={room} />
        ))}
      </div>
    </>
  );
};

export default MeetdrawsView;
