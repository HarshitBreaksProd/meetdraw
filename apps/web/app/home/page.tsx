"use client";

import AppointmentCard from "@/components/home/AppointmentCard";
import ChatsView from "@/components/home/ChatsView";
import LinkButton from "@/components/home/LinkButton";
import MeetdrawCard from "@/components/home/MeetdrawCard";
import UserCard from "@/components/home/UserCard";
import { Input } from "@workspace/ui/components/input";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

const page = () => {
  const [position, setPosition] = useState<{ x: string; y: string }>({
    x: "0",
    y: "0",
  });
  const homeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX.toString(), y: event.clientY.toString() });
  };

  useEffect(() => {
    const homeDivCurrent = homeRef.current;
    if (!homeDivCurrent) return;

    homeDivCurrent.addEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={homeRef}
      className="flex overflow-clip relative w-screen h-screen p-2 gap-2 font-cabinet-grotesk tracking-wide bg-[#101010]"
    >
      <div
        style={{
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
        className="w-[70px] h-[70px] blur-xl bg-green-600 rounded-full -translate-x-1/2 -translate-y-1/2"
      />
      <div className="h-full w-1/4 flex flex-col space-y-2 border p-2 rounded-xl backdrop-blur-md bg-black/10">
        <UserCard />
        <ChatsView />
      </div>
      <div className="flex-1 min-h-0 w-3/4 flex flex-col space-y-2 p-2 border rounded-xl backdrop-blur-md bg-black/10">
        <div className="border  rounded-lg flex items-center justify-between py-3 px-4 backdrop-blur-md bg-black/40">
          <h1 className="text-2xl font-pencerio font-bold">meetdraw/ Home</h1>
          <LinkButton href="/create-room">Add Meetdraw</LinkButton>
        </div>
        <div className="border flex flex-col gap-2 rounded-xl p-4 flex-1 min-h-0 backdrop-blur-md bg-black/30">
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
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
            <MeetdrawCard />
          </div>
        </div>
        <AppointmentCard />
      </div>
    </div>
  );
};

export default page;
