import Canvas from "@/components/canvas/Canvas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CanvasPageProps {
  params: Promise<{ roomId: string }>;
}

async function CanvasPage({ params }: CanvasPageProps) {
  const { roomId } = await params;
  const jwtCookie = (await cookies()).get("jwt");
  if (!jwtCookie || !jwtCookie.value) {
    redirect("/signin");
  }

  return (
    <div className="h-screen w-screen">
      <Canvas roomId={roomId} token={jwtCookie.value} />
    </div>
  );
}

export default CanvasPage;
