import { WebSocket, WebSocketServer } from "ws";
import prismaClient from "@workspace/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocketMessageSchema } from "@workspace/common";
import { config } from "dotenv";
config();

interface WSConnection {
  userId: string;
  socket: WebSocket;
}

const wss = new WebSocketServer({ port: 8080 });

const activeRooms = new Map<string, WSConnection[]>();

wss.on("connection", (socket: WebSocket, req: Request) => {
  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const token = searchParams.get("token");

  if (!token) {
    console.log("Token not found");
    socket.send(JSON.stringify({ type: "error", message: "Token not found" }));
    socket.close();
    return;
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr"
    ) as JwtPayload;

    if (!verified?.id) {
      console.log("User not authorised");
      socket.send(
        JSON.stringify({ type: "error", message: "User not authorised" })
      );
      socket.close();
      return;
    }

    const userFound = prismaClient.user.findFirst({
      where: { id: verified.id },
    });

    if (!userFound) {
      console.log("User does not exist");
      socket.send(
        JSON.stringify({ type: "error", message: "User does not exist" })
      );
      socket.close();
      return;
    }
  } catch (e) {
    console.log(e);
    console.log("Error verifying user");
    socket.send(
      JSON.stringify({ type: "error", message: "Error verifying user" })
    );
    socket.close();
    return;
  }

  socket.on("message", async (data) => {
    const recievedData = JSON.parse(data as unknown as string);
    const validMessage = WebSocketMessageSchema.safeParse(recievedData);

    if (!validMessage.success) {
      console.log("Invalid message type : ", recievedData);
      socket.send(
        JSON.stringify({
          type: "error_message",
          content: "Invalid Message Schema/Format",
        })
      );
      return;
    }

    switch (validMessage.data.type) {
      case "connect_room":
        activeRooms.set(validMessage.data.roomId!, [
          ...(activeRooms.get(validMessage.data.roomId!) || []),
          { userId: validMessage.data.userId!, socket },
        ]);
        break;
      case "disconnect_room":
        activeRooms.delete(validMessage.data.roomId!);
        break;
      case "chat_message": {
        const socketList = activeRooms.get(validMessage.data.roomId!);

        if (
          !socketList?.includes({ userId: validMessage.data.userId!, socket })
        ) {
          socket.send(
            JSON.stringify({
              type: "error_message",
              content: "Not connected to the room",
            })
          );
          return;
        }

        const addChat = await prismaClient.chat.create({
          data: {
            userId: validMessage.data.userId!,
            roomId: validMessage.data.roomId!,
            content: validMessage.data.content!,
          },
        });

        socketList?.forEach((member) => {
          member.socket.send(
            JSON.stringify({
              type: "chat_message",
              userId: validMessage.data.userId!,
              roomId: validMessage.data.roomId!,
              content: validMessage.data.content!,
            })
          );
        });
        break;
      }
      case "canvas_info": {
        const socketList = activeRooms.get(validMessage.data.roomId!);
        socketList?.forEach((member) => {
          member.socket.send(
            JSON.stringify({
              type: "chat_message",
              userId: validMessage.data.userId!,
              roomId: validMessage.data.roomId!,
              content: validMessage.data.content!,
            })
          );
        });
        break;
      }
    }
  });
});
