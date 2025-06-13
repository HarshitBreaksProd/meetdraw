import { Request, Response } from "express";
import prismaClient from "@workspace/db/client";

export async function fetchHomeInfo(req: Request, res: Response) {
  const { title } = req.query;
  const userId = req.userId;

  if (title) {
    try {
      const rooms = await prismaClient.room.findMany({
        where: {
          title: {
            contains: title as string,
          },
          participants: {
            some: { id: userId },
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

      res.json({
        rooms,
      });
    } catch (e) {
      console.log(e);
      res.status(401).json({
        message: "Could not fetch rooms",
      });
    }
  }
  try {
    const rooms = await prismaClient.room.findMany({
      where: {
        participants: {
          some: { id: userId },
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
    res.json({
      rooms,
    });
  } catch (e) {
    console.log(e);
    res.status(401).json({
      message: "Could not fetch rooms",
    });
  }
}

export async function fetchAllChatMessages(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "User Id not found",
    });
    return;
  }

  const { roomId } = req.params;
  try {
    const userExists = await prismaClient.room.findFirst({
      where: {
        id: roomId,
        participants: {
          some: { id: userId },
        },
      },
      select: {
        id: true,
        title: true,
        joinCode: true,
      },
    });

    if (!userExists?.id) {
      res.status(401).json({
        message: "User not part of the room",
      });
      return;
    }

    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      take: 25,
      orderBy: {
        serialNumber: "desc",
      },
    });

    res.json({
      messages,
    });
  } catch (e) {
    console.log(e);
    res.status(401).json({
      message: "Could not fetch messages",
    });
  }
}
