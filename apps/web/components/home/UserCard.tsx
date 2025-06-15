import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { GiJetFighter } from "react-icons/gi";

const UserCard = () => {
  return (
    <Card className="backdrop-blur-md bg-black/50 hover:-translate-y-[2px] shadow hover:shadow-green-500/10 transition-all duration-300">
      <CardHeader className="-mb-4">
        <div className="flex w-full justify-between items-center">
          <CardTitle>Username</CardTitle>
          <GiJetFighter className="text-neutral-400" size={26} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Harshit Gupta</p>
        <p>Total Meetdraws: 10</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
