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
exports.fetchHomeInfo = fetchHomeInfo;
exports.fetchAllChatMessages = fetchAllChatMessages;
exports.fetchAllDraws = fetchAllDraws;
const client_1 = __importDefault(require("@workspace/db/client"));
function fetchHomeInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title } = req.query;
        const userId = req.userId;
        if (title) {
            try {
                const rooms = yield client_1.default.room.findMany({
                    where: {
                        title: {
                            contains: title,
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
            }
            catch (e) {
                console.log(e);
                res.status(401).json({
                    message: "Could not fetch rooms",
                });
            }
        }
        try {
            const rooms = yield client_1.default.room.findMany({
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
        }
        catch (e) {
            console.log(e);
            res.status(401).json({
                message: "Could not fetch rooms",
            });
        }
    });
}
function fetchAllChatMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({
                message: "User Id not found",
            });
            return;
        }
        const { roomId } = req.params;
        const { lastSrNo } = req.query;
        try {
            const userExists = yield client_1.default.room.findFirst({
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
            if (!(userExists === null || userExists === void 0 ? void 0 : userExists.id)) {
                res.status(401).json({
                    message: "User not part of the room",
                });
                return;
            }
            let messages;
            if (lastSrNo !== undefined) {
                messages = yield client_1.default.chat.findMany({
                    where: {
                        roomId: roomId,
                        serialNumber: {
                            lt: parseInt(lastSrNo),
                        },
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
                    take: 25,
                    orderBy: {
                        serialNumber: "desc",
                    },
                });
            }
            else {
                messages = yield client_1.default.chat.findMany({
                    where: {
                        roomId: roomId,
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
                    take: 25,
                    orderBy: {
                        serialNumber: "desc",
                    },
                });
            }
            res.json({
                messages: messages.reverse(),
            });
        }
        catch (e) {
            console.log(e);
            res.status(401).json({
                message: "Could not fetch messages",
            });
        }
    });
}
function fetchAllDraws(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({
                message: "User Id not found",
            });
            return;
        }
        const { roomId } = req.params;
        try {
            const draws = yield client_1.default.draw.findMany({
                where: {
                    roomId: roomId,
                },
            });
            res.json({
                draws,
            });
        }
        catch (e) {
            console.log(e);
            res.status(401).json({
                message: "Could not fetch draws",
            });
        }
    });
}
