"use server";

import prismaClient from "@workspace/db/client";
import { CreateRoomSchema, JoinRoomSchema } from "@workspace/common";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";

export interface RoomActionState {
  message: string;
  room?: any;
}

function generateJoinCode(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createRoomAction(
  initialState: RoomActionState,
  formData: FormData
): Promise<RoomActionState> {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const title = formData.get("title") as string;

  // Validate using shared schema
  const validation = CreateRoomSchema.safeParse({ title });
  if (!validation.success) {
    return {
      message: "Invalid title",
    };
  }

  try {
    const joinCode = generateJoinCode(6);

    const room = await prismaClient.room.create({
      data: {
        title: validation.data.title,
        joinCode,
        adminId: session.user.id,
        participants: {
          connect: [{ id: session.user.id }],
        },
      },
      include: {
        admin: {
          select: {
            name: true,
          },
        },
        Chat: {
          take: 1,
          orderBy: {
            serialNumber: "desc",
          },
          select: {
            user: {
              select: {
                name: true,
              },
            },
            content: true,
          },
        },
      },
    });

    return {
      message: "Room created successfully",
      room,
    };
  } catch (error: any) {
    console.error("Create room error:", error);
    return {
      message: "Failed to create room. Please try again.",
    };
  }
}

export async function joinRoomAction(
  initialState: RoomActionState,
  formData: FormData
): Promise<RoomActionState> {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const joinCode = formData.get("joinCode") as string;

  // Validate using shared schema
  const validation = JoinRoomSchema.safeParse({ joinCode });
  if (!validation.success) {
    return {
      message: "Invalid join code",
    };
  }

  try {
    const room = await prismaClient.room.update({
      where: {
        joinCode: validation.data.joinCode,
      },
      data: {
        participants: {
          connect: {
            id: session.user.id,
          },
        },
      },
      include: {
        admin: {
          select: {
            name: true,
          },
        },
        Chat: {
          take: 1,
          orderBy: {
            serialNumber: "desc",
          },
          select: {
            user: {
              select: {
                name: true,
              },
            },
            content: true,
          },
        },
      },
    });

    return {
      message: "Room joined successfully",
      room,
    };
  } catch (error: any) {
    console.error("Join room error:", error);
    return {
      message: "Failed to join room. Please check the join code and try again.",
    };
  }
}

export async function fetchAllRoomsAction(): Promise<any> {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  try {
    const rooms = await prismaClient.room.findMany({
      where: {
        participants: {
          some: { id: session.user.id },
        },
      },
      select: {
        id: true,
        title: true,
        joinCode: true,
        admin: {
          select: {
            name: true,
          },
        },
        adminId: true,
        Chat: {
          take: 1,
          orderBy: {
            serialNumber: "desc",
          },
          select: {
            user: {
              select: {
                name: true,
              },
            },
            content: true,
          },
        },
        Draw: {
          take: 10,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return rooms;
  } catch (error) {
    console.error("Fetch rooms error:", error);
    throw new Error("Failed to fetch rooms");
  }
}
