import { Request, Response } from "express";
import prismaClient from "@workspace/db/client";
import { random } from "../utils";
import { JoinRoomSchema } from "@workspace/common";

export async function createRoomController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const joinCode = random(6);

    if (!userId) {
      res.status(401).json({
        message: "User Id not found",
      });
      return;
    }

    const room = await prismaClient.room.create({
      data: {
        title: req.body?.title || `Room - ${joinCode}`,
        joinCode,
        adminId: userId,
        participants: {
          connect: [{ id: userId }],
        },
      },
    });

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error creating room",
    });
  }
}

export async function joinRoomController(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "User Id not found",
    });
    return;
  }

  const validInputs = JoinRoomSchema.safeParse(req.body);
  if (!validInputs.success) {
    res.status(411).json({
      message: "Invalid Input",
    });
    return;
  }

  try {
    const joinCode = validInputs.data.joinCode;
    const response = await prismaClient.room.update({
      where: {
        joinCode: joinCode,
      },
      data: {
        participants: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.json({
      message: "Room Joined Successfully",
      roomId: response.id,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Faced error joining room, please try again",
    });
    return;
  }
}
