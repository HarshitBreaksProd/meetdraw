import Canvas from "@/components/canvas/Canvas";

interface CanvasPageProps {
  params: Promise<{ roomId: string }>;
}

async function CanvasPage({ params }: CanvasPageProps) {
  const { roomId } = await params;
  console.log(roomId);

  return (
    <div className="h-screen w-screen">
      <Canvas />
    </div>
  );
}

export default CanvasPage;
