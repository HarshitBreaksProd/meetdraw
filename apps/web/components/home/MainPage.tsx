"use client";

import AppointmentCard from "@/components/home/AppointmentCard";
import ChatsView from "@/components/home/ChatsView";
import MeetdrawsView from "@/components/home/MeetdrawsView";
import UserCard from "@/components/home/UserCard";
import { useEffect, useRef, useState } from "react";
import StateButton from "./StateButton";
import CreateRoomView from "./CreateRoomView";
import JoinRoomView from "./JoinRoomView";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { setUser } from "@/lib/features/meetdraw/appSlice";
import { Room, User } from "@/types";

const MainPage = ({
  jwtCookie,
  user,
  rooms,
}: {
  jwtCookie: RequestCookie | undefined;
  user: User;
  rooms: Room[];
}) => {
  const userState = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!jwtCookie || !jwtCookie.value) {
      redirect("/signin");
    }
    if (!userState) {
      const user = JSON.parse(sessionStorage.getItem("user")!);
      if (user) {
        dispatch(setUser(user));
      }
    }
  }, [jwtCookie, userState]);

  const [position, setPosition] = useState<{ x: string; y: string }>({
    x: "0",
    y: "0",
  });
  const homeRef = useRef<HTMLDivElement>(null);

  const [viewState, setViewState] = useState<
    "meetdraws" | "create-room" | "join-room" | "chat"
  >("meetdraws");

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
        <UserCard user={user} />
        <ChatsView rooms={rooms} />
      </div>
      <div className="flex-1 min-h-0 w-3/4 flex flex-col space-y-2 p-2 border rounded-xl backdrop-blur-md bg-black/10">
        <div className="border  rounded-lg flex items-center justify-between py-3 px-4 backdrop-blur-md bg-black/40">
          <h1 className="text-2xl font-pencerio font-bold">meetdraw/ Home</h1>
          <div className="flex gap-2">
            <StateButton
              variant="secondary"
              value="join-room"
              onClick={setViewState}
            >
              Join Meetdraw
            </StateButton>
            <StateButton value="create-room" onClick={setViewState}>
              Add Meetdraw
            </StateButton>
          </div>
        </div>
        <div className="border flex flex-col gap-2 rounded-xl p-4 flex-1 min-h-0 backdrop-blur-md bg-black/30">
          {viewState === "meetdraws" && <MeetdrawsView />}
          {viewState === "create-room" && (
            <CreateRoomView setViewState={setViewState} />
          )}
          {viewState === "join-room" && (
            <JoinRoomView setViewState={setViewState} />
          )}
          {/* {viewState === "chat" && <ChatView />} */}
        </div>
        <AppointmentCard />
      </div>
    </div>
  );
};

export default MainPage;
