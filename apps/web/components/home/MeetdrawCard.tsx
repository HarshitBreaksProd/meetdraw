import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
const MeetdrawCard = () => {
  return (
    <Card className="block py-4 row-span-1 overflow-clip border cursor-pointer backdrop-blur-md bg-black/25 hover:-translate-y-[3px] transition-all duration-200 h-fit min-h-0">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Happy</CardTitle>
        <p className="text-xs text-neutral-500">23/12</p>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default MeetdrawCard;
