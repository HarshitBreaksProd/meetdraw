"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const client_1 = __importDefault(require("@workspace/db/client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("@workspace/common");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const wss = new ws_1.WebSocketServer({ port: Number(process.env.PORT) });
const activeRooms = new Map();
const userVerificationStatus = new Map();
wss.on("connection", (socket, req) => __awaiter(void 0, void 0, void 0, function* () {
    const searchParams = new URLSearchParams(req.url.split("?")[1]);
    const token = searchParams.get("token");
    userVerificationStatus.set(socket, { verified: false });
    socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const userStatus = userVerificationStatus.get(socket);
        if (!(userStatus === null || userStatus === void 0 ? void 0 : userStatus.verified)) {
            socket.send(JSON.stringify({
                type: "error_message",
                content: "User not verified",
            }));
            return;
        }
        const recievedData = JSON.parse(data);
        const validMessage = common_1.WebSocketMessageSchema.safeParse(recievedData);
        if (!validMessage.success) {
            console.log("Invalid message type : ", recievedData);
            socket.send(JSON.stringify({
                type: "error_message",
                content: "Invalid Message Schema/Format",
            }));
            return;
        }
        switch (validMessage.data.type) {
            case "connect_room":
                activeRooms.set(validMessage.data.roomId, [
                    ...(activeRooms.get(validMessage.data.roomId) || []),
                    { userId: validMessage.data.userId, socket, verified: true },
                ]);
                break;
            case "disconnect_room":
                for (const [roomId, connections] of activeRooms.entries()) {
                    const updatedConnections = connections.filter((conn) => conn.socket !== socket);
                    if (updatedConnections.length === 0) {
                        activeRooms.delete(roomId);
                    }
                    else {
                        activeRooms.set(roomId, updatedConnections);
                    }
                }
                break;
            case "chat_message": {
                const socketList = activeRooms.get(validMessage.data.roomId);
                if (!(socketList === null || socketList === void 0 ? void 0 : socketList.some((conn) => conn.userId === validMessage.data.userId && conn.socket === socket))) {
                    socket.send(JSON.stringify({
                        type: "error_message",
                        content: "Not connected to the room",
                    }));
                    return;
                }
                try {
                    const addChat = yield client_1.default.chat.create({
                        data: {
                            userId: validMessage.data.userId,
                            roomId: validMessage.data.roomId,
                            content: validMessage.data.content,
                        },
                        select: {
                            id: true,
                            content: true,
                            serialNumber: true,
                            createdAt: true,
                            userId: true,
                            user: {
                                select: {
                                    username: true,
                                },
                            },
                            roomId: true,
                        },
                    });
                    socketList === null || socketList === void 0 ? void 0 : socketList.forEach((member) => {
                        member.socket.send(JSON.stringify({
                            type: "chat_message",
                            userId: validMessage.data.userId,
                            roomId: validMessage.data.roomId,
                            content: JSON.stringify(addChat),
                        }));
                    });
                }
                catch (e) {
                    console.log(e);
                    socket.send(JSON.stringify({
                        type: "error_message",
                        content: "Error adding chat message",
                    }));
                }
                break;
            }
            case "draw": {
                const socketList = activeRooms.get(validMessage.data.roomId);
                if (!(socketList === null || socketList === void 0 ? void 0 : socketList.some((conn) => conn.userId === validMessage.data.userId && conn.socket === socket))) {
                    socket.send(JSON.stringify({
                        type: "error_message",
                        content: "Not connected to the room",
                    }));
                    return;
                }
                const drawData = JSON.parse(validMessage.data.content);
                try {
                    let addedDraw;
                    let draw;
                    switch (drawData.type) {
                        case "create":
                            draw = drawData.modifiedDraw;
                            addedDraw = yield client_1.default.draw.create({
                                data: {
                                    id: draw.id,
                                    shape: draw.shape,
                                    strokeStyle: draw.strokeStyle,
                                    fillStyle: draw.fillStyle,
                                    lineWidth: draw.lineWidth,
                                    font: draw.font,
                                    fontSize: draw.fontSize,
                                    startX: draw.startX,
                                    startY: draw.startY,
                                    endX: draw.endX,
                                    endY: draw.endY,
                                    text: draw.text,
                                    points: draw.points,
                                    roomId: validMessage.data.roomId,
                                },
                            });
                            break;
                        case "move":
                        case "edit":
                        case "resize":
                            draw = drawData.modifiedDraw;
                            addedDraw = yield client_1.default.draw.update({
                                where: { id: draw.id },
                                data: {
                                    startX: draw.startX,
                                    startY: draw.startY,
                                    endX: draw.endX,
                                    endY: draw.endY,
                                    text: draw.text,
                                    points: draw.points,
                                    shape: draw.shape,
                                    strokeStyle: draw.strokeStyle,
                                    fillStyle: draw.fillStyle,
                                    lineWidth: draw.lineWidth,
                                    font: draw.font,
                                    fontSize: draw.fontSize,
                                },
                            });
                            break;
                        case "erase":
                            draw = drawData.originalDraw;
                            addedDraw = yield client_1.default.draw.delete({
                                where: { id: draw.id },
                            });
                            break;
                    }
                    socketList === null || socketList === void 0 ? void 0 : socketList.forEach((member) => {
                        member.socket.send(JSON.stringify({
                            type: "draw",
                            userId: validMessage.data.userId,
                            roomId: validMessage.data.roomId,
                            content: validMessage.data.content,
                        }));
                    });
                }
                catch (e) {
                    console.log(e);
                    socket.send(JSON.stringify({
                        type: "error_message",
                        content: "Error adding draw",
                    }));
                }
                break;
            }
        }
    }));
    socket.on("close", () => {
        userVerificationStatus.delete(socket);
        for (const [roomId, connections] of activeRooms.entries()) {
            const updatedConnections = connections.filter((conn) => conn.socket !== socket);
            if (updatedConnections.length === 0) {
                activeRooms.delete(roomId);
            }
            else {
                activeRooms.set(roomId, updatedConnections);
            }
        }
    });
    if (!token) {
        console.log("Token not found");
        socket.send(JSON.stringify({
            type: "error_message",
            content: "Token not found",
        }));
        socket.close();
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr");
        if (!(verified === null || verified === void 0 ? void 0 : verified.id)) {
            console.log("User not authorised");
            socket.send(JSON.stringify({
                type: "error_message",
                content: "User not authorised",
            }));
            socket.close();
            return;
        }
        const userFound = yield client_1.default.user.findFirst({
            where: { id: verified.id },
        });
        if (!userFound) {
            console.log("User does not exist");
            socket.send(JSON.stringify({
                type: "error_message",
                content: "User does not exist",
            }));
            socket.close();
            return;
        }
        userVerificationStatus.set(socket, { verified: true, userId: verified.id });
        socket.send(JSON.stringify({
            type: "connection_ready",
            userId: verified.id,
        }));
    }
    catch (e) {
        console.log(e);
        console.log("Error verifying user");
        socket.send(JSON.stringify({
            type: "error_message",
            content: "Error verifying user",
        }));
        socket.close();
        return;
    }
}));
