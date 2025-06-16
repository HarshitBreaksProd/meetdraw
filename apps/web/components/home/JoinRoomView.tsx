"use client";

import { useActionState } from "react";
import FormInput from "../common/FormInput";
import SubmitButton from "../common/SubmitButton";
import { RxCross1 } from "react-icons/rx";
import { joinRoomAction } from "@/actions/roomActions";

const JoinRoomView = ({
  setViewState,
}: {
  setViewState: (
    viewState: "meetdraws" | "create-room" | "join-room" | "chat"
  ) => void;
}) => {
  const [state, formAction, isPending] = useActionState(joinRoomAction, {
    message: "",
  });

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-xl font-medium">Join a Meetdraw</h3>
        <button
          onClick={() => setViewState("meetdraws")}
          className="cursor-pointer"
        >
          <RxCross1 className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col w-full h-full items-center justify-center gap-2">
        <div className="w-1/3">
          <form className="flex flex-col gap-3" action={formAction}>
            <FormInput
              id="joinCode"
              name="joinCode"
              type="text"
              required={true}
              placeholder="Enter the join code"
            />
            <SubmitButton pending={isPending} loadingText="Joining...">
              {isPending ? "Joining..." : "Join"}
            </SubmitButton>
            {state.message ? (
              state.message.includes("success") ? (
                <p className="text-center text-sm text-green-500">
                  {state.message}
                </p>
              ) : (
                <p className="text-center text-sm text-red-500">
                  {state.message}
                </p>
              )
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default JoinRoomView;
