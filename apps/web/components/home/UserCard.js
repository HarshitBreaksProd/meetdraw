"use client";
import { Card, CardContent, CardHeader, CardTitle, } from "@workspace/ui/components/card";
import { GiAlienFire, GiJetFighter } from "react-icons/gi";
import { useAppSelector } from "@/lib/hooks/redux";
import { redirect } from "next/navigation";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@workspace/ui/components/tooltip";
import { signoutAction } from "@/actions/authActions";
const UserCard = () => {
    let user = useAppSelector((state) => state.app.user);
    const rooms = useAppSelector((state) => state.app.rooms);
    if (!user) {
        user = JSON.parse(sessionStorage.getItem("user") || "null");
        if (!user || user === null) {
            redirect("/signin");
        }
    }
    return (<Card className="backdrop-blur-md bg-black/50 hover:-translate-y-[2px] shadow hover:shadow-green-500/10 transition-all duration-300">
      <CardHeader className="-mb-4">
        <div className="flex w-full justify-between items-center">
          <CardTitle className="flex gap-1 items-center">
            {user.username}
            <Tooltip>
              <TooltipTrigger className="cursor-pointer">
                <BiChevronDown />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="">
                <button className="flex items-center gap-1 cursor-pointer" onClick={() => {
            signoutAction();
            redirect("/signin");
        }}>
                  <BiLogOut size={14}/>
                </button>
              </TooltipContent>
            </Tooltip>
          </CardTitle>
          <GiJetFighter className="text-neutral-400" size={26}/>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>{user.name}</p>
        <p className="flex items-center gap-1">
          Total Meetdraws -
          {rooms?.length ? (<span className="">{rooms.length}</span>) : (<GiAlienFire className="text-neutral-400 text-lg"/>)}
        </p>
      </CardContent>
    </Card>);
};
export default UserCard;
