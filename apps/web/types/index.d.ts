export interface Draw {
    id: string;
    shape: "rectangle" | "diamond" | "circle" | "line" | "arrow" | "text" | "freeHand";
    strokeStyle: string;
    fillStyle: string;
    lineWidth: number;
    font: string;
    fontSize: string;
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
    text: string;
    points: {
        x: number;
        y: number;
    }[];
}
export interface Message {
    id: string;
    content: string;
    serialNumber: number;
    userId: string;
    roomId: string;
    createdAt: Date;
    user: {
        username: string;
    };
}
export interface Action {
    type: "create" | "move" | "resize" | "erase" | "edit";
    originalDraw: Draw | null;
    modifiedDraw: Draw | null;
}
export interface User {
    id: string;
    name: string;
    username: string;
}
export interface Room {
    id: string;
    title: string;
    joinCode: string;
    adminId: string;
    Chat: {
        user: {
            username: string;
        };
        content: string;
    }[];
    Draw: Draw[];
    admin: {
        username: string;
    };
    createdAt: string;
}
//# sourceMappingURL=index.d.ts.map