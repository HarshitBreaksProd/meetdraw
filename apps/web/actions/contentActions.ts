"use server";

import { getAuthSession } from "@/lib/auth";
import prismaClient from "@workspace/db/client";
import { redirect } from "next/navigation";

export async function fetchHomeInfoAction(title?: string) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  try {
    let rooms;

    if (title) {
      // Search rooms by title
      rooms = await prismaClient.room.findMany({
        where: {
          title: {
            contains: title,
          },
          participants: {
            some: { id: session.user.id },
          },
        },
        select: {
          id: true,
          title: true,
          joinCode: true,
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
    } else {
      // Get all user's rooms
      rooms = await prismaClient.room.findMany({
        where: {
          participants: {
            some: { id: session.user.id },
          },
        },
        select: {
          id: true,
          title: true,
          joinCode: true,
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
    }

    return { rooms };
  } catch (error) {
    console.error("Fetch home info error:", error);
    throw new Error("Could not fetch rooms");
  }
}

export async function fetchAllChatMessagesAction(roomId: string) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  try {
    // First verify user is part of the room
    const userExists = await prismaClient.room.findFirst({
      where: {
        id: roomId,
        participants: {
          some: { id: session.user.id },
        },
      },
      select: {
        id: true,
        title: true,
        joinCode: true,
      },
    });

    if (!userExists?.id) {
      throw new Error("User not part of the room");
    }

    // Fetch chat messages
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      take: 25,
      orderBy: {
        serialNumber: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return {
      room: userExists,
      messages,
    };
  } catch (error) {
    console.error("Fetch chat messages error:", error);
    throw new Error("Could not fetch messages");
  }
}

export async function getUserInfoAction() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        photo: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { user };
  } catch (error) {
    console.error("Get user info error:", error);
    throw new Error("Could not fetch user info");
  }
}
