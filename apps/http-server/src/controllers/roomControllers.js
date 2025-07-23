"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomController = createRoomController;
exports.joinRoomController = joinRoomController;
exports.fetchAllRoomsController = fetchAllRoomsController;
const client_1 = __importDefault(require("@workspace/db/client"));
const utils_1 = require("../utils");
const common_1 = require("@workspace/common");
async function createRoomController(req, res) {
    try {
        const userId = req.userId;
        const joinCode = (0, utils_1.random)(6);
        if (!userId) {
            res.status(401).json({
                message: "User Id not found",
            });
            return;
        }
        const room = await client_1.default.room.create({
            data: {
                title: req.body.title,
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
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Error creating room",
        });
    }
}
async function joinRoomController(req, res) {
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({
            message: "User Id not found",
        });
        return;
    }
    const validInputs = common_1.JoinRoomSchema.safeParse(req.body);
    if (!validInputs.success) {
        res.status(411).json({
            message: "Invalid Input",
        });
        return;
    }
    try {
        const joinCode = validInputs.data.joinCode;
        const room = await client_1.default.room.update({
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
            room,
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: "Faced error joining room, please try again",
        });
        return;
    }
}
async function fetchAllRoomsController(req, res) {
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({
            message: "User Id not found",
        });
        return;
    }
    try {
        const rooms = await client_1.default.room.findMany({
            where: {
                participants: {
                    some: { id: userId },
                },
            },
            select: {
                id: true,
                title: true,
                joinCode: true,
                createdAt: true,
                admin: {
                    select: {
                        username: true,
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
                                username: true,
                            },
                        },
                        content: true,
                        createdAt: true,
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
        const sortedRooms = rooms.sort((a, b) => {
            const aLatestChat = a.Chat[0]?.createdAt || a.createdAt;
            const bLatestChat = b.Chat[0]?.createdAt || b.createdAt;
            return new Date(bLatestChat).getTime() - new Date(aLatestChat).getTime();
        });
        res.json({
            message: "Rooms fetched successfully",
            rooms: sortedRooms,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Error fetching rooms",
        });
    }
}
