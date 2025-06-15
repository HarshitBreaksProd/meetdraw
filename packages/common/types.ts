import { z } from "zod";

export const UserSignupSchema = z.object({
  // (for http - server)
  username: z.string(),
  password: z.string().min(8),
  name: z.string(),
});

export const UserSigninSchema = z.object({
  // (for http - server)
  username: z.string(),
  password: z.string().min(8),
});

export const JoinRoomSchema = z.object({
  // (for http - server)
  joinCode: z.string().length(6),
});

export const WebSocketMessageSchema = z.object({
  // Messages shared via WebSocket (for frontend and ws - server)
  type: z.enum([
    "connect_room",
    "disconnect_room",
    "chat_message",
    "draw",
    "error_message",
  ]),
  roomId: z.string().optional(),
  userId: z.string().optional(),
  content: z.string().optional(),
});
