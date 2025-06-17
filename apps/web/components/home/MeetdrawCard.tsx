import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Room } from "@/types";
import { redirect } from "next/navigation";

const MeetdrawCard = ({ room }: { room: Room }) => {
  return (
    <Card
      onClick={() => redirect(`/canvas/${room.id}`)}
      className="block py-4 row-span-1 overflow-clip border cursor-pointer backdrop-blur-md bg-black/25 hover:-translate-y-[3px] transition-all duration-200 h-fit min-h-0"
    >
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{room.title}</CardTitle>
        <p className="text-xs text-neutral-500">
          {new Date(room.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </CardHeader>
      <CardContent>{room.Draw}</CardContent>
    </Card>
  );
};

export default MeetdrawCard;
